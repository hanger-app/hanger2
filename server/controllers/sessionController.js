const axios = require('axios');
const jwt = require('jsonwebtoken');
const { GOOGLE_OAUTH_URL, GOOGLE_OAUTH_EXCHANGE_URL } = require('../util/googleOAuthConstants.js');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../util/jwtConstants.js');

const sessionController = {};

const refreshTokens = new Set();

sessionController.login = (req, res, next) => {
  return res.redirect(GOOGLE_OAUTH_URL);
};

sessionController.callback = async (req, res, next) => {
  const { code } = req.query;

  try {
    const exchangeUrl = `${GOOGLE_OAUTH_EXCHANGE_URL}&code=${code}`;
    const { data } = await axios.post(exchangeUrl);

    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    res.locals.userInfo = userInfo.data;
    return next();
  } catch (err) {
    console.error(err);
    return next({
      log: `ERROR: sessionController.callback: ${err.response}`,
      status: err.response?.status ?? 500,
      message: { error: 'There was an error' },
    });
  }
};

sessionController.startSession = async (req, res, next) => {
  const { email } = res.locals.userInfo;

  try {
    const accessToken = jwt.sign({ email }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ email }, REFRESH_TOKEN_SECRET);

    refreshTokens.add(refreshToken);

    res.cookie('token', accessToken, { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true });
    res.cookie('refresh', refreshToken, { maxAge: 60 * 60 * 24 * 7 * 52 * 1000, httpOnly: true });

    return next();
  } catch (err) {
    return next({
      log: `ERROR: sessionController.startSession: ${err}`,
      status: 500,
      message: { error: 'There was an error' },
    });
  }
};

sessionController.refresh = (req, res, next) => {
  const { refresh } = req.cookies;

  try {
    if (!refresh) {
      throw {
        log: `ERROR: sessionController.refresh:${new RangeError('No refresh token found in request cookies')}`,
        status: 401,
        message: { error: 'Unauthorized' },
      };
    }

    if (!refreshTokens.has(refresh)) {
      throw {
        log: `ERROR: sessionController.refresh: ${new RangeError('Supplied refresh token does not exist')}`,
        status: 403,
        message: { error: 'Forbidden' },
      };
    }

    jwt.verify(refresh, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return next({
          log: `ERROR: sessionController.refresh: jwt.verify: ${err}`,
          status: 403,
          message: { error: 'Forbidden' },
        });
      }

      const accessToken = jwt.sign({ email: decoded.email }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
      res.cookie('token', accessToken, { maxAge: 7 * 60 * 60 * 24 * 1000, httpOnly: true });

      return next();
    });
  } catch (err) {
    return next({
      log: err.log ?? `ERROR: sessionController.refresh: ${err}`,
      status: err.status ?? 400,
      message: err.message ?? { error: 'An error occurred' },
    });
  }
};

sessionController.invalidateRefreshToken = (req, res, next) => {
  const { refresh } = req.cookies;

  try {
    if (!refreshTokens.delete(refresh)) {
      throw {
        log: `ERROR: sessionController.invalidateRefreshToken: ${new RangeError(
          'Supplied refresh token does not exist'
        )}`,
        status: 204,
        message: { error: '' },
      };
    }

    return next();
  } catch (err) {
    return next({
      log: err.log ?? `ERROR: sessionController.invalidateRefreshToken: ${err}`,
      status: err.status ?? 400,
      message: err.message ?? { error: 'An error occurred' },
    });
  }
};

sessionController.createUserCookie = (req, res, next) => {
  const user = {
    id: res.locals.userInfo.id,
    email: res.locals.userInfo.email,
    google_picture: res.locals.userInfo.picture,
    authenticated: true,
  };

  res.cookie('user', user);
  return next();
};

module.exports = sessionController;
