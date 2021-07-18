const { Router } = require('express');
const userController = require('../controllers/userController.js');

const userRouter = Router();

userRouter.get('/:id', userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.foundUser);
});

userRouter.post('/:id', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

module.exports = userRouter;
