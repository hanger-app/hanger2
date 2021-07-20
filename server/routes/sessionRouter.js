const { Router } = require('express');
const sessionController = require('../controllers/sessionController.js');

const sessionRouter = Router();

sessionRouter.get('/login', sessionController.login);

sessionRouter.get(
  '/callback',
  sessionController.callback,
  sessionController.startSession,
  sessionController.createUserCookie,
  (req, res) => {
    return res.status(200).json(res.locals.userInfo);
  }
);

sessionRouter.post('/refresh', sessionController.refresh, (req, res) => {
  res.sendStatus(200);
});

sessionRouter.post('/logout', sessionController.invalidateRefreshToken, (req, res) => {
  res.sendStatus(204);
});

module.exports = sessionRouter;
