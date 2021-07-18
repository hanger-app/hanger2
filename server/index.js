const dotenvConfigOutput = require('dotenv').config();
if (dotenvConfigOutput.error) {
  throw new Error(`ERROR: index.js: ${dotenvConfigOutput.error}`);
}

const mongoConnection = require('./database');
const app = require('./server');

const PORT = process.env.PORT || 3000;

mongoConnection
  .then(() => {
    console.log('Connected to remote MongoDB instance');
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error) => console.error(error));
