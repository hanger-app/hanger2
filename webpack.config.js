const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    publicPath: isDevelopment ? '/' : '/build/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './build'),
    publicPath: '/',
    proxy: {
      '/api/leaders': 'http://localhost:3000',
    },
    hot: true,
  },
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hanger',
      template: path.resolve(__dirname, './index.html'),
      minify: false,
    }),
    isDevelopment && new HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
