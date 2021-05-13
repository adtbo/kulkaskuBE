const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryId: {
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
  },
  {
    timestamps: true,
  }
);

const category = mongoose.model("category", categorySchema);

module.exports = category;
