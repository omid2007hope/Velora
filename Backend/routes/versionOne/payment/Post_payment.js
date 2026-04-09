const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { validateBody } = require("../../../middleware/validate");
const { paymentMethodSchema } = require("../../../validation/schemas");
const { PaymentDetails } = require("../../../controller/version_1/Payment");

const router = express.Router();

router.post(
  "/server/customer/login/account/payment",
  requireAuth,
  validateBody(paymentMethodSchema),
  PaymentDetails,
);

module.exports = router;
