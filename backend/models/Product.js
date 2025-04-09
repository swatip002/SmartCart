const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate barcode
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0, // Stock count for inventory management
  },
  imageUrl: {
    type: String, // URL of the product image
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
