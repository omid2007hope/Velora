const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { validateBody } = require("../../../middleware/validate");
const { orderSchema } = require("../../../validation/schemas");
const { createOrder } = require("../../../controller/version_1/Order");

const router = express.Router();

router.post(
  "/server/checkout/order",
  requireAuth,
  validateBody(orderSchema),
  createOrder,
);

module.exports = router;
