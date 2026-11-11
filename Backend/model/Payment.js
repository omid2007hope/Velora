/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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


