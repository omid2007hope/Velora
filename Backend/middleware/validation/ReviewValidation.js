const { validateBody, validateParams } = require("./common");
const {
  reviewCreateSchema,
  productIdParamsSchema,
} = require("../../validation/schemas");

module.exports = {
  validateReviewProductId: validateParams(productIdParamsSchema),
  validateCreateReview: validateBody(reviewCreateSchema),
};
