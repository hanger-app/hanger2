const mongoose = require('mongoose');

const mongoConnection = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoConnection;
