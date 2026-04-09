const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { validateBody } = require("../../../middleware/validate");
const { cartItemSchema } = require("../../../validation/schemas");
const { getCart, addItem } = require("../../../controller/version_1/Cart");

const router = express.Router();

router.post("/server/cart", requireAuth, getCart);
router.post(
  "/server/cart/item",
  requireAuth,
  validateBody(cartItemSchema),
  addItem,
);

module.exports = router;
