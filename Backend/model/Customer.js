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
      sparse: true,
      trim: true,
    },
  },

  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Customer", CustomerSchema);

// Mongoose model for caching X user data
