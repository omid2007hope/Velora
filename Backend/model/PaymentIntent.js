// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const PaymentIntentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
      index: true,
    },
    provider: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["stripe", "paypal", "manual"],
      default: "stripe",
      index: true,
    },
    providerIntentId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: [
        "requires_payment_method",
        "requires_action",
        "processing",
        "succeeded",
        "failed",
        "canceled",
      ],
      default: "requires_payment_method",
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: "USD",
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("PaymentIntent", PaymentIntentSchema);
