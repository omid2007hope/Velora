const { validateBody } = require("./common");
const { addressSchema } = require("../../validation");

module.exports = {
  validateCreateAddress: validateBody(addressSchema),
};
