const { validateBody } = require("./common");
const { storeSchema } = require("../../validation/schemas");
// const { validateOwnerId } = require("../../validation/schemas");

module.exports = {
  validateCreateStore: validateBody(storeSchema),
  // validateOwnerId,
};
