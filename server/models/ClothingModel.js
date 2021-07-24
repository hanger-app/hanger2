const { Schema, model } = require('mongoose');

const ClothingSchema = new Schema(
  {
    user: { type: String, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    lastWorn: { type: Date, required: true },
    recommendForDonation: { type: Boolean, default: false, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Clothing = model('Clothing', ClothingSchema);

module.exports = Clothing;
