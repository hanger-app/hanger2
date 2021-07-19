const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}

app.use('/*', (req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line no-unused-vars
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
