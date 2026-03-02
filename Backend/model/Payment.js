const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    cardNumber: {
      type: String,
      unique: true,
      index: true,
    },

    cvv: {
      type: String,
      index: true,
    },

    expiry: {
      type: String,
      index: true,
    },
  },

  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Payment", PaymentSchema);

// Mongoose model for caching X user data
