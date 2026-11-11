// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
 */

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
