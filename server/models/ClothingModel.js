const { Schema, model } = require('mongoose');

const ClothingSchema = new Schema(
  {
    user: { type: Number, ref: 'User', required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    lastWorn: { type: Date, required: true },
    recommendForDonation: { type: Boolean, default: false, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV === 'development',
  }
);

const Clothing = model('Clothing', ClothingSchema);

module.exports = Clothing;
