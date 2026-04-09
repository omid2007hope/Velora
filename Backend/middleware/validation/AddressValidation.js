const { validateBody } = require("./common");
const { addressSchema } = require("../../validation/schemas");

module.exports = {
  validateCreateAddress: validateBody(addressSchema),
};
