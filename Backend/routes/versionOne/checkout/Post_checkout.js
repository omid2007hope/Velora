const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { createOrder } = require("../../../controller/OrderController");
const {
  validateCreateOrder,
} = require("../../../middleware/validation/OrderValidation");

const router = express.Router();

router.post(
  "/order",
  requireAuth,
  validateCreateOrder,
  createOrder,
);

module.exports = router;
