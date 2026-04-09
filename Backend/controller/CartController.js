const asyncHandler = require("../utils/asyncHandler");
const cartService = require("../services/CartService");
const { createHttpError } = require("../utils/httpError");
const { isValidObjectId } = require("../utils/validators");

function getAuthorizedUserId(req) {
  const userId = req.user?.id;

  if (!isValidObjectId(userId)) {
    throw createHttpError(401, "Unauthorized");
  }

  return userId;
}

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCartByUser(getAuthorizedUserId(req));
  return res.status(200).json({ data: cart });
});

const createCart = asyncHandler(async (req, res) => {
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
  createCart,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart,
};
