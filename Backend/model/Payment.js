const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    cardFingerprint: {
      type: String,
      unique: true,
      index: true,
    },
    cardNumber: {
      type: String,
      index: true,
    },
    cardLast4: {
      type: String,
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
