const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { validateBody } = require("../../../middleware/validate");
const { updateQuantitySchema } = require("../../../validation/schemas");
const { updateQuantity } = require("../../../controller/version_1/Cart");

const router = express.Router();

router.patch(
  "/server/cart/item",
  requireAuth,
  validateBody(updateQuantitySchema),
  updateQuantity,
);

module.exports = router;
