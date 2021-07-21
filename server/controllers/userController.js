const User = require('../models/UserModel.js');

const userController = {
  async createUser(req, res, next) {
    try {
      const createUserQuery = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        zipcode: req.body.zipcode,
      };

      for (const [key, value] of Object.entries(createUserQuery)) {
        if (value === undefined) {
          throw {
            log: `ERROR: userController.createUser: ${new TypeError(`${key} is undefined`)}`,
            status: 400,
            message: `Please provide ${key}`,
          };
        }
      }

      const newUser = await User.create(createUserQuery);

      res.locals.newUser = newUser;
      return next();
    } catch (err) {
      return next({
        log: err.log ?? `ERROR: userController.createUser: ${err}`,
        status: err.status ?? 400,
        message: err.message ? { error: err.message } : { error: 'An error occurred!' },
      });
    }
  },

  async getUser(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw {
          log: 'ERROR: userController.createUser: ID was not provided',
          status: 400,
          message: 'Please provide a valid id',
        };
      }

      const foundUser = await User.findOne({ email: id });

      if (!foundUser) {
        throw {
          log: 'ERROR: userController.getUser: ID does not exist',
          status: 404,
          message: 'The provided email does not exist.',
        };
      }

      res.locals.foundUser = foundUser;

      return next();
    } catch (err) {
      return next({
        log: err.log ?? `ERROR: userController.getUser: ${err}`,
        status: err.status ?? 400,
        message: err.message ? { error: err.message } : { error: 'An error occurred!' },
      });
    }
  },
};

module.exports = userController;
