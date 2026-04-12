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

router.post("/server/store-owner", validateCreateStoreOwner, createStoreOwner);
router.post(
  "/server/store-owner/login",
  authLimiter,
  validateStoreOwnerLogin,
  loginStoreOwner,
);
router.post(
  "/server/store-owner/token/refresh",
  authLimiter,
  validateRefreshStoreOwnerToken,
  refreshStoreOwnerToken,
);
router.post(
  "/server/store-owner/email/verify",
  validateRequestStoreOwnerEmailVerification,
  requestStoreOwnerEmailVerification,
);
router.post(
  "/server/store-owner/email/verify/confirm",
  validateConfirmStoreOwnerEmailVerification,
  confirmStoreOwnerEmailVerification,
);
router.post(
  "/server/store-owner/password-reset",
  validateRequestStoreOwnerPasswordReset,
  requestStoreOwnerPasswordReset,
);
router.post(
  "/server/store-owner/password-reset/confirm",
  validateConfirmStoreOwnerPasswordReset,
  confirmStoreOwnerPasswordReset,
);

module.exports = router;
