const { validateBody } = require("./common");
const { storeSchema, patchStoreSchema } = require("../../validation");

module.exports = {
  validateCreateStore: validateBody(storeSchema),
  validatePatchStore: validateBody(patchStoreSchema),
  // validateOwnerId,
};
