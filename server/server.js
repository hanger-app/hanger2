const express = require('express');
const path = require('path');

// import routers
const userRouter = require('./routes/userRouter.js');

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}

app.use('/*', (req, res, next) => {
  return next({
    log: `ERROR: Resource '${req.originalUrl}' does not exist`,
    status: 404,
    message: { error: 'Resource does not exist.' },
  });
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'An unexpected middleware error occurred!',
    status: 400,
    message: { error: 'An error occurred!' },
  };

  const errorObject = { ...defaultError, ...err };
  console.error(errorObject.log);

  return res.status(errorObject.status).json(errorObject.message);
});

module.exports = app;
