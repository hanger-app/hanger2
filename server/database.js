const mongoose = require('mongoose');

// Load models before connecting to MongoDB
require('./models/UserModel.js');
require('./models/ClothingModel.js');

const mongoConnection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoConnection;
