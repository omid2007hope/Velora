// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      select: false,
    },
    phoneNumber: {
      type: String,
      trim: true,
      index: true,
      sparse: true,
      unique: true,
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["male", "female", "other", ""],
      default: "",
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["local", "google"],
      default: "local",
      index: true,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);


