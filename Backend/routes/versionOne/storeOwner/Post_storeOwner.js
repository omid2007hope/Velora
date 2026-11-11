// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
