const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const userRouter = require('./routes/userRouter.js');
const sessionRouter = require('./routes/sessionRouter.js');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
}

app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));

app.use('/api/users', userRouter);

app.use('/api/sessions', sessionRouter);

app.use('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'ERROR: server.js: An unexpected middleware error occurred!',
    status: 400,
    msg: { error: 'An error occurred!' },
  };

  const errorObject = { ...defaultError, ...err };
  console.error(errorObject.log);

  return res.status(errorObject.status).json(errorObject.msg);
});

module.exports = app;
