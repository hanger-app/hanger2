const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClothingSchema = new Schema(
  {
    clothingName: { type: String, required: true },
    clothingDescription: { type: String, required: true },
    lastWorn: { type: Date, required: true },
    recommendForDonation: { type: Boolean, default: false, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Clothes = mongoose.model('Clothing', ClothingSchema);

module.exports = Clothes;
