require('dotenv').config();
const mongoose = require('mongoose');

const setupDatabase = async () => {
  const mongoConnection = mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return mongoConnection;
};

const teardownDatabase = async () => {
  await mongoose.connection.db.dropDatabase(process.env.TEST_DATABASE);
  await mongoose.disconnect();
};

module.exports = { setupDatabase, teardownDatabase };
