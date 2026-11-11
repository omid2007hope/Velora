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
