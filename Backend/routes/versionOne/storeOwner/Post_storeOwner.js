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

router.post("/", validateCreateStoreOwner, createStoreOwner);
router.post(
  "/login",
  authLimiter,
  validateStoreOwnerLogin,
  loginStoreOwner,
);
router.post(
  "/token/refresh",
  authLimiter,
  validateRefreshStoreOwnerToken,
  refreshStoreOwnerToken,
);
router.post(
  "/email/verify",
  validateRequestStoreOwnerEmailVerification,
  requestStoreOwnerEmailVerification,
);
router.post(
  "/email/verify/confirm",
  validateConfirmStoreOwnerEmailVerification,
  confirmStoreOwnerEmailVerification,
);
router.post(
  "/password-reset",
  validateRequestStoreOwnerPasswordReset,
  requestStoreOwnerPasswordReset,
);
router.post(
  "/password-reset/confirm",
  validateConfirmStoreOwnerPasswordReset,
  confirmStoreOwnerPasswordReset,
);

module.exports = router;
