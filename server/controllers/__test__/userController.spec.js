const userController = require('../userController.js');
const User = require('../../models/UserModel.js');

describe('userController', () => {
  let req = {
    params: {
      id: '1234567890',
    },
  };

  let res = {
    locals: {
      userInfo: {
        id: '1234567890',
        given_name: 'foo',
        family_name: 'bar',
        email: 'fizz@buzz.io',
        zipcode: '99999',
      },
    },
  };

  const nextMock = jest.fn((input) => input);

  afterEach(() => {
    jest.clearAllMocks();

    req = {
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
      },
    };
  });

  describe('createUser', () => {
    test('skip user creation if user already exists', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(true);

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
    });

    test('successfully create a new user', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(false);
      const UserCreateSpy = jest.spyOn(User, 'create').mockResolvedValue();

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(UserCreateSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
    });

    test('call next with error arg if User.exists rejects', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockRejectedValue();
      const UserCreateSpy = jest.spyOn(User, 'create').mockResolvedValue();

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(UserCreateSpy).toHaveBeenCalledTimes(0);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });

    test('call next with error arg if User.create rejects', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(false);
      const UserCreateSpy = jest.spyOn(User, 'create').mockRejectedValue();

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(UserCreateSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });

    test('call next with error arg if userInfo is malformed', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(false);
      const UserCreateSpy = jest.spyOn(User, 'create').mockResolvedValue();

      await userController.createUser(req, { locals: { userInfo: {} } }, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(UserCreateSpy).toHaveBeenCalledTimes(0);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });
  });

  describe('getUser', () => {
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
      const UserFindOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(null);

      await userController.getUser(req, res, nextMock);

      expect(UserFindOneSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).not.toHaveReturnedWith(undefined);
    });
  });

  describe('getUserCloset', () => {
    xtest('successfully gets user closet', async () => {
      User.findOne.populate = jest.fn(() => Promise.resolve({ closet: [] }));
      const UserFindOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(() => ({ populate: () => jest.fn() }));

      await userController.getUserCloset(req, res, nextMock);

      expect(UserFindOneSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
    });

    test('call next with error arg if id is missing from request parameters', async () => {
      const UserFindOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(false);

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
});
