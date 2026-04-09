const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { validateBody } = require("../../../middleware/validate");
const { removeItemSchema } = require("../../../validation/schemas");
const { removeItem, clearCart } = require("../../../controller/version_1/Cart");

const router = express.Router();

router.delete(
  "/server/cart/item",
  requireAuth,
  validateBody(removeItemSchema),
  removeItem,
);
router.delete("/server/cart", requireAuth, clearCart);

module.exports = router;
