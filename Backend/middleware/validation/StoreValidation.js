const { validateBody } = require("./common");
const { storeSchema, patchStoreSchema } = require("../../validation/schemas");
// const { validateOwnerId } = require("../../validation/schemas");

module.exports = {
  validateCreateStore: validateBody(storeSchema),
  validatePatchStore: validateBody(patchStoreSchema),
  // validateOwnerId,
};
