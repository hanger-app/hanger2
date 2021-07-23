const userController = require('../userController.js');
const Clothing = require('../../models/ClothingModel.js');
const User = require('../../models/UserModel.js');

describe('userController', () => {
  let req;

  let res;

  const nextMock = jest.fn((input) => input);

  const userInstance = new User();

  beforeEach(() => {
    req = {
      body: {
        name: 'mock clothing name',
        description: 'mock clothing description',
      },
      params: {
        id: '1234567890',
      },
    };

    res = {
      locals: {
        userInfo: {
          id: '1234567890',
          given_name: 'foo',
          family_name: 'bar',
          email: 'fizz@buzz.io',
          zipcode: '99999',
        },
        foundUser: userInstance,
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    req = null;
    res = null;
  });

  describe('createUser', () => {
    test('skip user creation if user already exists', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(new User());

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
    });

    test('successfully create a new user', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(false);
      const UserCreateSpy = jest.spyOn(User, 'create').mockResolvedValue(new User());

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(UserCreateSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
    });

    test('call next with error arg if User.exists rejects', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockRejectedValue(false);
      const UserCreateSpy = jest.spyOn(User, 'create').mockResolvedValue(new User());

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(UserCreateSpy).toHaveBeenCalledTimes(0);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });

    test('call next with error arg if User.create rejects', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(false);
      const UserCreateSpy = jest.spyOn(User, 'create').mockRejectedValue(null);

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(UserCreateSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });

    test('call next with error arg if userInfo is malformed', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(false);
      const UserCreateSpy = jest.spyOn(User, 'create').mockResolvedValue(new User());

      await userController.createUser(req, { locals: { userInfo: {} } }, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(UserCreateSpy).toHaveBeenCalledTimes(0);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });
  });

  describe('getUser', () => {
    // not working, have to figure out a way to create a .populate spy
    xtest('successfully gets user', async () => {
      const UserFindOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue({ closet: [] });

      await userController.getUser(req, res, nextMock);

      expect(UserFindOneSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
    });

    test("call next with error arg if id doesn't exist", async () => {
      await userController.getUser({ params: { id: undefined } }, res, nextMock);

      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });

    test("call next with error arg if can't find user", async () => {
      const UserFindOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(new User());

      await userController.getUser(req, res, nextMock);

      expect(UserFindOneSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });
  });

  describe('getUserCloset', () => {
    // not working; have to figure out how to create a .populate spy
    xtest('successfully gets user closet', async () => {
      User.findOne.populate = jest.fn(() => Promise.resolve({ closet: [] }));
      const UserFindOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(() => ({ populate: () => jest.fn() }));

      await userController.getUserCloset(req, res, nextMock);

      expect(UserFindOneSpy.findOne.populate).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
    });

    test('call next with error arg if id is missing from request parameters', async () => {
      const UserFindOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(new User());

      await userController.getUserCloset({ params: { id: undefined } }, res, nextMock);

      expect(UserFindOneSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });

    test('call next with error arg if cannot find a user closet', async () => {
      const UserFindOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(false);

      await userController.getUserCloset(req, res, nextMock);

      expect(UserFindOneSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });
  });

  describe('insertClothingIntoUserCloset', () => {
    test('successfully insert into user closet', async () => {
      const ClothingPrototypeSpy = jest.spyOn(Clothing.prototype, 'save').mockResolvedValue(new Clothing());
      const UserPrototypeSpy = jest.spyOn(User.prototype, 'save').mockResolvedValue(new User());

      await userController.insertClothingIntoUserCloset(req, res, nextMock);

      expect(ClothingPrototypeSpy).toHaveBeenCalledTimes(1);
      expect(UserPrototypeSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
      expect(res.locals.updatedUser).not.toEqual(res.locals.foundUser);
    });

    test('call next with err arg if req.params.id is falsy/missing', async () => {
      await userController.insertClothingIntoUserCloset({ params: { id: undefined } }, res, nextMock);

      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });
  });
});
