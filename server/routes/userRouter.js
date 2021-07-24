const { Router } = require('express');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');

const userRouter = Router();

userRouter.get('/:id/closet', sessionController.verify, userController.getUserCloset, (req, res) => {
  return res.status(200).json(res.locals.closet);
});

userRouter.post(
  '/:id/closet',
  sessionController.verify,
  userController.getUser,
  userController.insertClothingIntoUserCloset,
  (req, res) => {
    const restrictedFields = {
      closet: res.locals.foundUser.closet,
      firstName: res.locals.foundUser.firstName,
      lastName: res.locals.foundUser.lastName,
      email: res.locals.foundUser.email,
      zipcode: res.locals.foundUser.zipcode,
    };

    return res.status(201).json(restrictedFields);
  }
);

userRouter.get('/:id', sessionController.verify, userController.getUser, (req, res) => {
  const restrictedFields = {
    closet: res.locals.foundUser.closet,
    firstName: res.locals.foundUser.firstName,
    lastName: res.locals.foundUser.lastName,
    email: res.locals.foundUser.email,
    zipcode: res.locals.foundUser.zipcode,
  };

  return res.status(200).json(restrictedFields);
});

module.exports = userRouter;
