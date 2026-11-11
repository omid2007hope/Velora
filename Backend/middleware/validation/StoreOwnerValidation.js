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

const { validateBody } = require("./common");
const {
  storeOwnerRegisterSchema,
  storeOwnerLoginSchema,
  refreshSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
  tokenOnlySchema,
  emailOnlySchema,
} = require("../../validation");

module.exports = {
  validateCreateStoreOwner: validateBody(storeOwnerRegisterSchema),
  validateStoreOwnerLogin: validateBody(storeOwnerLoginSchema),
  validateRefreshStoreOwnerToken: validateBody(refreshSchema),
  validateRequestStoreOwnerEmailVerification: validateBody(emailOnlySchema),
  validateConfirmStoreOwnerEmailVerification: validateBody(tokenOnlySchema),
  validateRequestStoreOwnerPasswordReset: validateBody(passwordResetRequestSchema),
  validateConfirmStoreOwnerPasswordReset: validateBody(passwordResetConfirmSchema),
};
