const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    categoryId: {
      type: String,
      required: false,
      trim: true,
    },
    unit: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("product", productSchema);

module.exports = product;
