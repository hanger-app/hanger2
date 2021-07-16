require('dotenv').config();
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
