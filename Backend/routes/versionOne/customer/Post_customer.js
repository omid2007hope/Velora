const express = require("express");
const { authLimiter } = require("../../../middleware/rateLimit");
const { validateBody } = require("../../../middleware/validate");
const {
  registerSchema,
  loginSchema,
  refreshSchema,
  passwordResetRequestSchema,
  tokenOnlySchema,
  emailOnlySchema,
} = require("../../../validation/schemas");
const { CustomerData } = require("../../../controller/version_1/Register");
const {
  loginIntoTheAccount,
  refreshAccessToken,
} = require("../../../controller/version_1/Login");
const {
  requestPasswordReset,
  confirmPasswordReset,
} = require("../../../controller/version_1/Password");
const {
  requestVerification,
  confirmVerification,
} = require("../../../controller/version_1/EmailVerification");

const router = express.Router();

router.post("/server/customer", validateBody(registerSchema), CustomerData);
router.post(
  "/server/customer/login",
  authLimiter,
  validateBody(loginSchema),
  loginIntoTheAccount,
);
router.post(
  "/server/customer/token/refresh",
  authLimiter,
  validateBody(refreshSchema),
  refreshAccessToken,
);
router.post(
  "/server/customer/email/verify",
  validateBody(emailOnlySchema),
  requestVerification,
);
router.post(
  "/server/customer/email/verify/confirm",
  validateBody(tokenOnlySchema),
  confirmVerification,
);
router.post(
  "/server/customer/password-reset",
  validateBody(passwordResetRequestSchema),
  requestPasswordReset,
);
router.post(
  "/server/customer/password-reset/confirm",
  validateBody(tokenOnlySchema),
  confirmPasswordReset,
);

module.exports = router;
