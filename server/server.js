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

app.use('/api/users', userRouter);

app.use('/api/sessions', sessionRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}

app.use('/*', (req, res, next) => {
  return next({
    log: `ERROR: server.js: Resource '${req.originalUrl}' does not exist`,
    status: 404,
    message: { error: 'Resource does not exist.' },
  });
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'ERROR: server.js: An unexpected middleware error occurred!',
    status: 400,
    message: { error: 'An error occurred!' },
  };

  const errorObject = { ...defaultError, ...err };
  console.error(errorObject.log);

  return res.status(errorObject.status).json(errorObject.message);
});

module.exports = app;
