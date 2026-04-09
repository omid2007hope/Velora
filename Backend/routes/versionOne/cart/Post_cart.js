const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const {
  getCart,
  addCartItem,
} = require("../../../controller/CartController");
const {
  validateAddCartItem,
} = require("../../../middleware/validation/CartValidation");

const router = express.Router();

router.post("/server/cart", requireAuth, getCart);
router.post(
  "/server/cart/item",
  requireAuth,
  validateAddCartItem,
  addCartItem,
);

module.exports = router;
