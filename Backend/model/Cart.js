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


