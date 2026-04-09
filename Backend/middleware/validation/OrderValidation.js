const { validateBody, validateParams } = require("./common");
const {
  orderSchema,
  orderStatusSchema,
  objectIdParamsSchema,
} = require("../../validation/schemas");

module.exports = {
  validateCreateOrder: validateBody(orderSchema),
  validateUpdateOrderStatus: validateBody(orderStatusSchema),
  validateOrderId: validateParams(objectIdParamsSchema),
};
