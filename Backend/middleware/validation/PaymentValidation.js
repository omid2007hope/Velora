const { validateBody } = require("./common");
const { paymentMethodSchema } = require("../../validation/schemas");

module.exports = {
  validateCreatePaymentMethod: validateBody(paymentMethodSchema),
};
