const axios = require('axios');
const {
  GOOGLE_OAUTH_URL,
  GOOGLE_OAUTH_BASE_EXCHANGE,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CALLBACK,
} = require('../util/googleOAuthConstants.js');

const sessionController = {};

sessionController.login = (req, res, next) => {
  return res.redirect(GOOGLE_OAUTH_URL);
};

sessionController.callback = async (req, res, next) => {
  const { code } = req.query;

  try {
    const exchangeUrl = `${GOOGLE_OAUTH_BASE_EXCHANGE}?code=${code}&client_id=${GOOGLE_OAUTH_CLIENT_ID}&client_secret=${GOOGLE_OAUTH_CLIENT_SECRET}&redirect_uri=${GOOGLE_OAUTH_CALLBACK}&grant_type=authorization_code`;
    const { data } = await axios.post(exchangeUrl);

    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    res.locals.userInfo = userInfo.data;

    return next();
  } catch (err) {
    return next({
      log: `ERROR: sessionController.callback: ${err.response}`,
      status: err.response.status,
      message: { error: 'There was an error' },
    });
  }
};

module.exports = sessionController;
