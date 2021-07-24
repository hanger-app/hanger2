// const axios = require('axios');
const sessionController = require('../sessionController.js');

describe('sessionController', () => {
  let req;

  let res;

  // const nextMock = jest.fn((input) => input);

  const userInstance = {};

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
        foundUser: { ...userInstance, closet: [] },
      },
      redirect: jest.fn((input) => input),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    req = null;
    res = null;
  });

  describe('login', () => {
    test('redirects to google oauth', async () => {
      await sessionController.login(req, res);

      expect(res.redirect).toHaveBeenCalledTimes(1);
      expect(res.redirect).not.toHaveReturnedWith(undefined);
    });
  });
});
