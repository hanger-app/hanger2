require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = app;
