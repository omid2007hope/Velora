// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
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
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Store", StoreSchema);
