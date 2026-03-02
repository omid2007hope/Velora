const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      index: true,
    },

    city: {
      type: String,
      index: true,
    },

    street: {
      type: String,
      index: true,
    },

    postalCode: {
      type: String,
      index: true,
    },
  },

  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Address", AddressSchema);

// Mongoose model for caching X user data
