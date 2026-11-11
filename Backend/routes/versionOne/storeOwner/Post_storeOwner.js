/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

const express = require("express");
const requireAuth = require("../../../middleware/auth/token/authorization/Mandatory");
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
router.post("/token/refresh", authLimiter, validateRefreshStoreOwnerToken, refreshStoreOwnerToken);
router.post(
  "/email/verify",
  authLimiter,
  validateRequestStoreOwnerEmailVerification,
  requestStoreOwnerEmailVerification
);
router.post(
  "/email/verify/confirm",
  authLimiter,
  validateConfirmStoreOwnerEmailVerification,
  confirmStoreOwnerEmailVerification
);
router.post(
  "/password-reset",
  authLimiter,
  validateRequestStoreOwnerPasswordReset,
  requestStoreOwnerPasswordReset
);
router.post(
  "/password-reset/confirm",
  authLimiter,
  validateConfirmStoreOwnerPasswordReset,
  confirmStoreOwnerPasswordReset
);

module.exports = router;
