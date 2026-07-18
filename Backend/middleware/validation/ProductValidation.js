const { validateBody, validateParams } = require("./common");
const {
  productCreateSchema,
  patchProductSchema,
  objectIdParamsSchema,
} = require("../../validation");

module.exports = {
  validateCreateProduct: validateBody(productCreateSchema),
  validatePatchProduct: validateBody(patchProductSchema),
  validateProductId: validateParams(objectIdParamsSchema),
};
