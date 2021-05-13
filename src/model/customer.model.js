const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const customer = mongoose.model("customer", customerSchema);

module.exports = customer;
