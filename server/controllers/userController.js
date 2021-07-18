const User = require('../models/UserModel.js');

const userController = {
  async createUser(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return next({
        log: 'ERROR: userController.createUser: ID was not provided',
        status: 400,
        message: { error: 'Please provide a valid id' },
      });
    }

    try {
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: id,
        zipcode: req.body.zipcode,
      });

      res.locals.newUser = newUser;
      return next();
    } catch (err) {
      return next({
        log: `userController.createUser: ${err}`,
        status: 400,
        message: { error: 'An error occurred!' },
      });
    }
  },

  async getUser(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return next({
        log: 'ERROR: userController.createUser: ID was not provided',
        status: 400,
        message: { error: 'Please provide a valid id' },
      });
    }

    try {
      const foundUser = await User.findOne({ email: id });

      if (!foundUser) {
        return next({
          log: 'ERROR: userController.getUser: ID does not exist',
          status: 404,
          message: { error: 'The provided email does not exist.' },
        });
      }

      res.locals.foundUser = foundUser;

      return next();
    } catch (err) {
      return next({
        log: `userController.getUser: ${err}`,
        status: 400,
        message: { error: 'An error occurred!' },
      });
    }
  },
};

module.exports = userController;
