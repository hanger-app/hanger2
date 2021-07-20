const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    zipcode: { type: Number },
    oauthAccessToken: { type: String },
    closet: [{ type: Schema.Types.ObjectId, ref: 'Clothing' }],
  },
  { timestamps: true }
);

const Users = mongoose.model('User', UserSchema);

module.exports = Users;