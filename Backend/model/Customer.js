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
  },

  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Customer", CustomerSchema);

// Mongoose model for caching X user data
