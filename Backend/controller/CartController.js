// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
