const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    zipcode: { type: Number, required: true },
    oauthId: { type: Number, required: true },
    closet: [{ type: Schema.Types.ObjectId, ref: 'Clothing' }],
  },
  { timestamps: true }
);

const Users = mongoose.model('User', UserSchema);

module.exports = Users;
