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


