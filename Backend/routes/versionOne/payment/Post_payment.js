const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { createPaymentMethod } = require("../../../controller/PaymentController");
const {
  validateCreatePaymentMethod,
} = require("../../../middleware/validation/PaymentValidation");

const router = express.Router();

router.post(
  "/server/customer/login/account/payment",
  requireAuth,
  validateCreatePaymentMethod,
  createPaymentMethod,
);

module.exports = router;
