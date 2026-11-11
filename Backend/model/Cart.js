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

const CartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    variant: {
      selectedColor: {
        type: String,
        trim: true,
        default: "",
      },
      selectedSize: {
        type: String,
        trim: true,
        default: "",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    priceSnapshot: {
      oldPrice: {
        type: Number,
        min: 0,
      },
      newPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      discount: {
        type: String,
        trim: true,
      },
      currency: {
        type: String,
        trim: true,
        uppercase: true,
        default: "USD",
      },
    },
    productSnapshot: {
      name: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
      category: {
        type: String,
        trim: true,
      },
    },
  },
  { _id: true, versionKey: false },
);

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sessionId: {
      type: String,
      trim: true,
      default: null,
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  { versionKey: false, timestamps: true },
);

CartSchema.index({ userId: 1 }, { unique: true, sparse: true });
CartSchema.index({ sessionId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Cart", CartSchema);


