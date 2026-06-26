const express = require("express");
const requireAuth = require("../../../middleware/auth/token/authorization/Mandatory");

const { createPaymentMethod } = require("../../../controller/PaymentController");
const { validateCreatePaymentMethod } = require("../../../middleware/validation/PaymentValidation");

const router = express.Router();

router.post("/", requireAuth, validateCreatePaymentMethod, createPaymentMethod);

module.exports = router;
