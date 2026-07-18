const { validateBody, validateParams } = require("./common");
const { storeSchema, patchStoreSchema, objectIdParamsSchema } = require("../../validation");

module.exports = {
  validateCreateStore: validateBody(storeSchema),
  validatePatchStore: validateBody(patchStoreSchema),
  validateStoreId: validateParams(objectIdParamsSchema),
};
