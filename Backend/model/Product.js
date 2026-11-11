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

const ProductSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      index: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      min: 0,
    },

    oldPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    newPrice: {
      type: Number,
      min: 0,
    },

    discount: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    subCategory: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    NewArrivals: {
      type: Boolean,
      default: false,
      index: true,
    },

    color: [
      {
        type: String,
        trim: true,
      },
    ],

    size: [
      {
        type: String,
        trim: true,
      },
    ],

    highlights: [
      {
        type: String,
        trim: true,
      },
    ],

    details: {
      type: String,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      default: null,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
