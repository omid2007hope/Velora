// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    storeOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },

    oldPrice: {
      type: Number,
      min: 0,
    },

    newPrice: {
      type: Number,
      min: 0,
    },

    discount: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    subCategory: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    NewArrivals: {
      type: Boolean,
      default: false,
      index: true,
    },

    color: [
      {
        type: String,
        trim: true,
      },
    ],

    size: [
      {
        type: String,
        trim: true,
      },
    ],

    highlights: [
      {
        type: String,
        trim: true,
      },
    ],

    details: {
      type: String,
      trim: true,
    },

    reviews: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);
