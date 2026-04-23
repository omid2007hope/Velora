const { validateBody } = require("./common");
const {
  registerSchema,
  loginSchema,
  refreshSchema,
  passwordResetRequestSchema,
  tokenOnlySchema,
  emailOnlySchema,
} = require("../../validation/schemas");

module.exports = {
  validateCreateCustomer: validateBody(registerSchema),
  validateCustomerLogin: validateBody(loginSchema),
  validateRefreshCustomerToken: validateBody(refreshSchema),
  validateRequestCustomerEmailVerification: validateBody(emailOnlySchema),
  validateConfirmCustomerEmailVerification: validateBody(tokenOnlySchema),
  validateRequestCustomerPasswordReset: validateBody(
    passwordResetRequestSchema,
  ),
  validateConfirmCustomerPasswordReset: validateBody(tokenOnlySchema),
};
