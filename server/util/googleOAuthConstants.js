const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_BASE_ENDPOINT,
  GOOGLE_OAUTH_BASE_EXCHANGE,
  GOOGLE_OAUTH_SCOPE,
  GOOGLE_OAUTH_CALLBACK,
} = process.env;

const GOOGLE_OAUTH_URL = `${GOOGLE_OAUTH_BASE_ENDPOINT}?client_id=${GOOGLE_OAUTH_CLIENT_ID}&scope=${GOOGLE_OAUTH_SCOPE}&redirect_uri=${GOOGLE_OAUTH_CALLBACK}&access_type=offline&response_type=code`;

module.exports = {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_BASE_ENDPOINT,
  GOOGLE_OAUTH_BASE_EXCHANGE,
  GOOGLE_OAUTH_SCOPE,
  GOOGLE_OAUTH_CALLBACK,
  GOOGLE_OAUTH_URL,
};