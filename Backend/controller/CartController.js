/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

const asyncHandler = require("../utils/asyncHandler");
const cartService = require("../services/CartService");

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCartByUser(req.user.id);
  return res.status(200).json({ data: cart });
});

const addCartItem = asyncHandler(async (req, res) => {
  const updatedCart = await cartService.addCartItem({
    userId: req.user.id,
    item: req.body,
  });

  return res.status(201).json({ data: updatedCart });
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const updatedCart = await cartService.updateCartItemQuantity({
    userId: req.user.id,
    itemId: req.body.itemId,
    quantity: req.body.quantity,
  });

  return res.status(200).json({ data: updatedCart });
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const updatedCart = await cartService.removeCartItem({
    userId: req.user.id,
    itemId: req.body.itemId,
  });

  return res.status(200).json({ data: updatedCart });
});

const clearCart = asyncHandler(async (req, res) => {
  const clearedCart = await cartService.clearCart(req.user.id);
  return res.status(200).json({ data: clearedCart });
});

module.exports = {
  getCart,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart,
};
