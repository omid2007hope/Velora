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

const StoreSchema = new mongoose.Schema(
  {
    // storeId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   index: true,
    // },

    ownerOfStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    storeName: {
      type: String,
      required: true,
      index: true,
    },

    storeDescription: {
      type: String,
      required: true,
      index: true,
    },

    countryStoreLocatedIn: {
      type: String,
      required: true,
      index: true,
    },

    stateOrProvinceStoreLocatedIn: {
      type: String,
      required: false,
      index: true,
    },

    cityStoreLocatedIn: {
      type: String,
      required: true,
      index: true,
    },

    storeAddress: {
      type: String,
      required: true,
      index: true,
    },

    storeZipcode: {
      type: String,
      required: true,
      index: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
