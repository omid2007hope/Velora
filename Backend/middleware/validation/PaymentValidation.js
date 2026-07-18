const { validateBody } = require("./common");
const { paymentMethodSchema } = require("../../validation");

module.exports = {
  validateCreatePaymentMethod: validateBody(paymentMethodSchema),
};
