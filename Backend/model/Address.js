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


