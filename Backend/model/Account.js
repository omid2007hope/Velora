// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const CustomerDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true,
      index: true,
    },
    gender: {
      type: String,
      index: true,
    },

    dateOfBirth: {
      type: String,
      index: true,
    },

    phoneNumber: {
      type: String,
      index: true,
      unique: true,
      trim: true,
    },
  },

  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("CustomerDetails", CustomerDetailsSchema);

// Mongoose model for caching X user data


