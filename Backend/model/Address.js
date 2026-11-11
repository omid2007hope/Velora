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

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    country: {
      type: String,
      index: true,
      required: true,
      trim: true,
      lowercase: true,
    },

    city: {
      type: String,
      index: true,
      required: true,
      trim: true,
      lowercase: true,
    },

    street: {
      type: String,
      index: true,
      required: true,
      trim: true,
      lowercase: true,
    },

    postalCode: {
      type: String,
      index: true,
      required: true,
      trim: true,
      lowercase: true,
    },
  },

  { versionKey: false, timestamps: true },
);

AddressSchema.index(
  { userId: 1, country: 1, city: 1, street: 1, postalCode: 1 },
  { unique: true },
);

module.exports = mongoose.model("Address", AddressSchema);

// Mongoose model for caching X user data


