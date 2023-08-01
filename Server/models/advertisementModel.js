const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
      required: true,
    },
    billAvailable: {
      type: Boolean,
      default: false,
      required: true,
    },
    warrantyAvailable: {
      type: Boolean,
      default: false,
      required: true,
    },
    accessoriesAvailable: {
      type: Boolean,
      default: false,
      required: true,
    },
    negotiable: {
      type: Boolean,
      default: false,
      required: true,
    },
    boxAvailable: {
      type: Boolean,
      default: false,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Ensure that it matches the model name of the User model
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Ads", advertisementSchema);
module.exports = Product;
