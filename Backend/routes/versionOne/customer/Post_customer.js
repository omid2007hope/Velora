const express = require("express");
const { authLimiter } = require("../../../middleware/rateLimit");
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

router.post("/server/customer", validateCreateCustomer, createCustomer);
router.post(
  "/server/customer/login",
  authLimiter,
  validateCustomerLogin,
  loginCustomer,
);
router.post(
  "/server/customer/token/refresh",
  authLimiter,
  validateRefreshCustomerToken,
  refreshCustomerToken,
);
router.post(
  "/server/customer/email/verify",
  validateRequestCustomerEmailVerification,
  requestCustomerEmailVerification,
);
router.post(
  "/server/customer/email/verify/confirm",
  validateConfirmCustomerEmailVerification,
  confirmCustomerEmailVerification,
);
router.post(
  "/server/customer/password-reset",
  validateRequestCustomerPasswordReset,
  requestCustomerPasswordReset,
);
router.post(
  "/server/customer/password-reset/confirm",
  validateConfirmCustomerPasswordReset,
  confirmCustomerPasswordReset,
);

module.exports = router;
