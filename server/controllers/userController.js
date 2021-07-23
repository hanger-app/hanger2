const { Types } = require('mongoose');
const User = require('../models/UserModel.js');
const Clothing = require('../models/ClothingModel.js');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const isExistingUser = await User.exists({ oauthId: res.locals?.userInfo?.id });

    if (isExistingUser) {
      return next();
    }

    const newUser = {
      firstName: res.locals?.userInfo?.given_name,
      lastName: res.locals?.userInfo?.family_name,
      email: res.locals?.userInfo?.email,
      zipcode: '99999',
      oauthId: res.locals?.userInfo?.id,
    };

    for (const [key, value] of Object.entries(newUser)) {
      if (value === undefined) {
        throw {
          log: `ERROR: userController.createUser: ${new TypeError(`${key} is undefined. Check OAuth scopes`)}`,
          status: 400,
          msg: { error: 'An error occurred!' },
        };
      }
    }

    await User.create(newUser);

    return next();
  } catch (err) {
    return next({
      log: err?.log ?? `ERROR: userController.createUser: ${err}`,
      status: err?.status ?? 400,
      msg: err?.msg ?? { error: 'An error occurred!' },
    });
  }
};

userController.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new TypeError('ERROR: userController.getUser: invalid id');
    }

    if (!id) {
      throw {
        log: `ERROR: userController.createUser: ${new RangeError('ID was not provided')}`,
        status: 400,
        msg: { error: 'Please provide a valid id' },
      };
    }

    const foundUser = await User.findOne({ oauthId: id });

    if (!foundUser) {
      throw {
        log: `ERROR: userController.getUser: ${new RangeError('ID does not exist')}`,
        status: 404,
        msg: { error: 'The provided id does not exist.' },
      };
    }

    res.locals.foundUser = foundUser;

    return next();
  } catch (err) {
    return next({
      log: err.log ?? `ERROR: userController.getUser: ${err}`,
      status: err.status ?? 400,
      msg: err.msg ?? { error: 'An error occurred!' },
    });
  }
};

userController.getUserCloset = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userDoc = await User.findOne({ oauthId: id }, 'closet').populate('closet');

    if (!userDoc) {
      throw {
        log: `ERROR: userController.getUserCloset: ${new RangeError('User ID does not exist ')}`,
        status: 400,
        msg: { error: 'There was a problem retrieving the closet' },
      };
    }

    res.locals.closet = { closet: userDoc.closet };

    return next();
  } catch (err) {
    return next({
      log: err.log ?? `ERROR: userController.getUserCloset: ${err}`,
      status: err.status ?? 400,
      msg: err.msg ?? { error: 'An error occurred!' },
    });
  }
};

userController.insertClothingIntoUserCloset = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw {
        log: `ERROR: userController.insertClothingToUserCloset: ${new TypeError('Invalid id')}`,
        status: 400,
        msg: { error: 'Please provide a valid id' },
      };
    }

    if (!req.body.name || typeof req.body.name !== 'string') {
      req.body.name = '';
    }

    if (!req.body.description || typeof req.body.description !== 'string') {
      req.body.description = '';
    }

    const clothingDoc = new Clothing({
      _id: new Types.ObjectId(),
      user: req.params.id,
      name: req.body.name,
      description: req.body.description,
      lastWorn: Date.now(),
      recommendForDonation: false,
      imageUrl: 'REPLACE WITH DEFAULT IMAGE URL',
    });

    await clothingDoc.save();

    const { foundUser } = res.locals;
    foundUser.closet.push(clothingDoc._id);
    const updatedUser = await foundUser.save();

    res.locals.updatedUser = updatedUser;

    return next();
  } catch (err) {
    return next({
      log: err.log ?? `ERROR: userController.insertClothingToUserCloset: ${err}`,
      status: err.status ?? 400,
      msg: err.msg ?? { error: 'An error occurred!' },
    });
  }
};

module.exports = userController;
