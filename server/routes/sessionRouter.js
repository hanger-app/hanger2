const { Router } = require('express');
const sessionController = require('../controllers/sessionController.js');

const sessionRouter = Router();

sessionRouter.get('/login', sessionController.login);

sessionRouter.get('/callback', sessionController.callback, (req, res) => {
  return res.status(200).json(res.locals?.userInfo);
});

module.exports = sessionRouter;
