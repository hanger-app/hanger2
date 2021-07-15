require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}

app.use('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = app;
