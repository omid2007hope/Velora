const { validateBody, validateParams } = require("./common");
const {
  productCreateSchema,
  patchProductSchema,
  objectIdParamsSchema,
} = require("../../validation/schemas");

module.exports = {
  validateCreateProduct: validateBody(productCreateSchema),
  validatePatchProduct: validateBody(patchProductSchema),
  validateProductId: validateParams(objectIdParamsSchema),
};
