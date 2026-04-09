const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { deleteCartItem, clearCart } = require("../../../controller/CartController");
const {
  validateDeleteCartItem,
} = require("../../../middleware/validation/CartValidation");

const router = express.Router();

router.delete(
  "/server/cart/item",
  requireAuth,
  validateDeleteCartItem,
  deleteCartItem,
);
router.delete("/server/cart", requireAuth, clearCart);

module.exports = router;
