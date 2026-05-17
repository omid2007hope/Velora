const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const {
  updateCartItemQuantity,
} = require("../../../api/controller/CartController");
const {
  validateUpdateCartItemQuantity,
} = require("../../../middleware/validation/CartValidation");

const router = express.Router();

router.patch(
  "/item",
  requireAuth,
  validateUpdateCartItemQuantity,
  updateCartItemQuantity,
);

module.exports = router;

