// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
    },
    provider: {
      type: String,
      default: "stripe",
      index: true,
    },
    paymentMethodId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    last4: {
      type: String,
      trim: true,
    },
    expMonth: {
      type: Number,
      min: 1,
      max: 12,
    },
    expYear: {
      type: Number,
      min: 2000,
    },
    billingName: {
      type: String,
      trim: true,
    },
  },

  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Payment", PaymentSchema);


