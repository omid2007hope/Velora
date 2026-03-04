const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    variant: {
      selectedColor: {
        type: String,
        trim: true,
        default: "",
      },
      selectedSize: {
        type: String,
        trim: true,
        default: "",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    priceSnapshot: {
      oldPrice: {
        type: Number,
        min: 0,
      },
      newPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      discount: {
        type: String,
        trim: true,
      },
      currency: {
        type: String,
        trim: true,
        uppercase: true,
        default: "USD",
      },
    },
    productSnapshot: {
      name: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
      category: {
        type: String,
        trim: true,
      },
    },
  },
  { _id: true, versionKey: false },
);

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sessionId: {
      type: String,
      trim: true,
      default: null,
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  { versionKey: false, timestamps: true },
);

CartSchema.index({ userId: 1 }, { unique: true, sparse: true });
CartSchema.index({ sessionId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Cart", CartSchema);
