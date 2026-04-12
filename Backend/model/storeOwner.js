// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    storeOwnerName: {
      type: String,
      required: true,
      trim: true,
      index: true,
      minlength: 2,
      maxlength: 120,
    },

    storeOwnerEmailAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    storeOwnerPasswordHash: {
      type: String,
      select: false,
    },

    storeOwnerProvider: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["local", "google"],
      default: "local",
      index: true,
    },

    storeOwner: {
      type: Boolean,
      default: true,
      index: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
      index: true,
      select: false,
    },

    emailVerificationExpires: {
      type: Date,
      select: false,
    },

    passwordResetToken: {
      type: String,
      index: true,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      select: false,
    },

    pendingPasswordHash: {
      type: String,
      select: false,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Seller", SellerSchema);
