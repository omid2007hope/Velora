const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const {
  updateCartItemQuantity,
} = require("../../../controller/CartController");
const {
  validateUpdateCartItemQuantity,
} = require("../../../middleware/validation/CartValidation");

const router = express.Router();

router.patch(
  "/server/cart/item",
  requireAuth,
  validateUpdateCartItemQuantity,
  updateCartItemQuantity,
);

module.exports = router;
