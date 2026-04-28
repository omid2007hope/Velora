const express = require("express");
const { authLimiter } = require("../../../middleware/request/rateLimit");
const {
  createCustomer,
  loginCustomer,
  refreshCustomerToken,
  requestCustomerEmailVerification,
  confirmCustomerEmailVerification,
  requestCustomerPasswordReset,
  confirmCustomerPasswordReset,
} = require("../../../controller/CustomerController");
const {
  validateCreateCustomer,
  validateCustomerLogin,
  validateRefreshCustomerToken,
  validateRequestCustomerEmailVerification,
  validateConfirmCustomerEmailVerification,
  validateRequestCustomerPasswordReset,
  validateConfirmCustomerPasswordReset,
} = require("../../../middleware/validation/CustomerValidation");

const router = express.Router();

router.post("/", authLimiter, validateCreateCustomer, createCustomer);
router.post("/login", authLimiter, validateCustomerLogin, loginCustomer);
router.post(
  "/token/refresh",
  authLimiter,
  validateRefreshCustomerToken,
  refreshCustomerToken,
);
router.post(
  "/email/verify",
  authLimiter,
  validateRequestCustomerEmailVerification,
  requestCustomerEmailVerification,
);
router.post(
  "/email/verify/confirm",
  authLimiter,
  validateConfirmCustomerEmailVerification,
  confirmCustomerEmailVerification,
);
router.post(
  "/password-reset",
  authLimiter,
  validateRequestCustomerPasswordReset,
  requestCustomerPasswordReset,
);
router.post(
  "/password-reset/confirm",
  authLimiter,
  validateConfirmCustomerPasswordReset,
  confirmCustomerPasswordReset,
);

module.exports = router;
