const express = require("express");
const { authLimiter } = require("../../../middleware/request/rateLimit");
const {
  createStoreOwner,
  loginStoreOwner,
  refreshStoreOwnerToken,
  requestStoreOwnerEmailVerification,
  confirmStoreOwnerEmailVerification,
  requestStoreOwnerPasswordReset,
  confirmStoreOwnerPasswordReset,
} = require("../../../controller/StoreOwnerController");
const {
  validateCreateStoreOwner,
  validateStoreOwnerLogin,
  validateRefreshStoreOwnerToken,
  validateRequestStoreOwnerEmailVerification,
  validateConfirmStoreOwnerEmailVerification,
  validateRequestStoreOwnerPasswordReset,
  validateConfirmStoreOwnerPasswordReset,
} = require("../../../middleware/validation/StoreOwnerValidation");

const router = express.Router();

router.post("/", authLimiter, validateCreateStoreOwner, createStoreOwner);
router.post("/login", authLimiter, validateStoreOwnerLogin, loginStoreOwner);
router.post(
  "/token/refresh",
  authLimiter,
  validateRefreshStoreOwnerToken,
  refreshStoreOwnerToken,
);
router.post(
  "/email/verify",
  authLimiter,
  validateRequestStoreOwnerEmailVerification,
  requestStoreOwnerEmailVerification,
);
router.post(
  "/email/verify/confirm",
  authLimiter,
  validateConfirmStoreOwnerEmailVerification,
  confirmStoreOwnerEmailVerification,
);
router.post(
  "/password-reset",
  authLimiter,
  validateRequestStoreOwnerPasswordReset,
  requestStoreOwnerPasswordReset,
);
router.post(
  "/password-reset/confirm",
  authLimiter,
  validateConfirmStoreOwnerPasswordReset,
  confirmStoreOwnerPasswordReset,
);

module.exports = router;
