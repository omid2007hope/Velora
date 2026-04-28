const { validateBody } = require("./common");
const {
  storeOwnerRegisterSchema,
  storeOwnerLoginSchema,
  refreshSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
  tokenOnlySchema,
  emailOnlySchema,
} = require("../../validation/schemas");

module.exports = {
  validateCreateStoreOwner: validateBody(storeOwnerRegisterSchema),
  validateStoreOwnerLogin: validateBody(storeOwnerLoginSchema),
  validateRefreshStoreOwnerToken: validateBody(refreshSchema),
  validateRequestStoreOwnerEmailVerification: validateBody(emailOnlySchema),
  validateConfirmStoreOwnerEmailVerification: validateBody(tokenOnlySchema),
  validateRequestStoreOwnerPasswordReset: validateBody(
    passwordResetRequestSchema,
  ),
  validateConfirmStoreOwnerPasswordReset: validateBody(
    passwordResetConfirmSchema,
  ),
};
