const { validateBody, validateParams } = require("./common");
const { reviewCreateSchema, productIdParamsSchema } = require("../../validation");

module.exports = {
  validateReviewProductId: validateParams(productIdParamsSchema),
  validateCreateReview: validateBody(reviewCreateSchema),
};
