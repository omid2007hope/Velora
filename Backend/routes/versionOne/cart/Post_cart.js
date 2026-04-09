const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const {
  createCart,
  addCartItem,
} = require("../../../controller/CartController");
const {
  validateAddCartItem,
} = require("../../../middleware/validation/CartValidation");

const router = express.Router();

router.post("/server/cart", requireAuth, createCart);
router.post(
  "/server/cart/item",
  requireAuth,
  validateAddCartItem,
  addCartItem,
);

module.exports = router;
