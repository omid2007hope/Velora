const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { updateOrderStatus } = require("../../../controller/OrderController");
const {
  validateUpdateOrderStatus,
  validateOrderId,
} = require("../../../middleware/validation/OrderValidation");

const router = express.Router();

router.patch(
  "/order/:id",
  requireAuth,
  validateOrderId,
  validateUpdateOrderStatus,
  updateOrderStatus,
);

module.exports = router;
