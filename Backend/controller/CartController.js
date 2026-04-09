const asyncHandler = require("../utils/asyncHandler");
const cartService = require("../services/CartService");
const getAuthorizedUserId = require("../utils/getAuthorizedUserId");

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCartByUser(getAuthorizedUserId(req));
  return res.status(200).json({ data: cart });
});

const addCartItem = asyncHandler(async (req, res) => {
  const updatedCart = await cartService.addCartItem({
    userId: getAuthorizedUserId(req),
    item: req.body,
  });

  return res.status(201).json({ data: updatedCart });
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const updatedCart = await cartService.updateCartItemQuantity({
    userId: getAuthorizedUserId(req),
    itemId: req.body.itemId,
    quantity: req.body.quantity,
  });

  return res.status(200).json({ data: updatedCart });
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const updatedCart = await cartService.removeCartItem({
    userId: getAuthorizedUserId(req),
    itemId: req.body.itemId,
  });

  return res.status(200).json({ data: updatedCart });
});

const clearCart = asyncHandler(async (req, res) => {
  const clearedCart = await cartService.clearCart(getAuthorizedUserId(req));
  return res.status(200).json({ data: clearedCart });
});

module.exports = {
  getCart,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart,
};
