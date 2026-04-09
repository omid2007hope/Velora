const { validateBody, validateParams } = require("./common");
const {
  productCreateSchema,
  objectIdParamsSchema,
} = require("../../validation/schemas");

module.exports = {
  validateCreateProduct: validateBody(productCreateSchema),
  validateProductId: validateParams(objectIdParamsSchema),
};
