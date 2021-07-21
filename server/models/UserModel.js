const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    oauthId: { type: Number, required: true, unique: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    zipcode: { type: Number, required: true },
    closet: [{ type: Schema.Types.ObjectId, ref: 'Clothing' }],
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV === 'development',
  }
);

const User = model('User', UserSchema);

module.exports = User;
