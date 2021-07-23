const userController = require('../userController.js');
const User = require('../../models/UserModel.js');

describe('userController', () => {
  const req = Object.freeze({});

  const res = Object.freeze({
    locals: {
      userInfo: {
        id: '1234567890',
        given_name: 'foo',
        family_name: 'bar',
        email: 'fizz@buzz.io',
        zipcode: '99999',
      },
    },
  });

  const nextMock = jest.fn((input) => input);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    test('User exists', async () => {
      const UserExistsSpy = jest.spyOn(User, 'exists').mockResolvedValue(true);

      await userController.createUser(req, res, nextMock);

      expect(UserExistsSpy).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalled();
      expect(nextMock).toHaveReturnedWith(undefined);
    });

    test('User does not exist', async () => {
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
});
