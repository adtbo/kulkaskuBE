const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
  },
});

const transactionSchema = new Schema(
  {
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    products: [productSchema],
  },
  {
    timestamps: true,
  }
);

const transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction;
