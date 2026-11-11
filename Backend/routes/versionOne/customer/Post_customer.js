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

