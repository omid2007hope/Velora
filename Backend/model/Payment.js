// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
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
      select: false,
    },
    cardLast4: {
      type: String,
      index: true,
    },

    cvv: {
      type: String,
      index: true,
      select: false,
    },

    expiry: {
      type: String,
      index: true,
    },
  },

  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Payment", PaymentSchema);


