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


