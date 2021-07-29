const { Router } = require('express');
const sessionController = require('../controllers/sessionController.js');
const userController = require('../controllers/userController.js');

const sessionRouter = Router();

sessionRouter.get('/login', sessionController.login);

sessionRouter.get(
  '/callback',
  sessionController.callback,
  userController.createUser,
  sessionController.startSession,
  sessionController.createUserCookie,
  (req, res) => {
    return res.redirect('/');
  }
);

sessionRouter.post('/refresh', sessionController.refresh, (req, res) => {
  return res.sendStatus(200);
});

sessionRouter.post('/logout', sessionController.invalidateRefreshToken, (req, res) => {
  return res.sendStatus(204);
});

module.exports = sessionRouter;
