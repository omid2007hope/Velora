const { validateBody } = require("./common");
const {
  cartItemSchema,
  updateQuantitySchema,
  removeItemSchema,
} = require("../../validation/schemas");

module.exports = {
  validateAddCartItem: validateBody(cartItemSchema),
  validateUpdateCartItemQuantity: validateBody(updateQuantitySchema),
  validateDeleteCartItem: validateBody(removeItemSchema),
};
