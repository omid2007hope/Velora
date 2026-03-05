// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
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

module.exports = mongoose.model("Customer", CustomerSchema);

// Mongoose model for caching X user data


