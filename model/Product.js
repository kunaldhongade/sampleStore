const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String },
  price: {
    type: Number,
    min: [0, "Price cannot be negative"],
    default: 0,
  },
  discountPercentage: {
    type: Number,
    min: [0, "Discount cannot be negative"],
    max: [100, "Discount cannot be greater than 100"],
    default: 0,
  },
  rating: {
    type: Number,
    min: [0, "Rating must be greater than 0"],
    max: [5, "Rating must be less than 5"],
    default: 0,
  },
  // stock: Number,
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

exports.Product = mongoose.model("Product", productSchema);
