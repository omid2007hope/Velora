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

