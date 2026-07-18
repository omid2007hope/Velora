const asyncHandler = require("../utils/asyncHandler");
const reviewService = require("../services/ReviewService");

const listReviews = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const result = await reviewService.listReviewsByProduct(productId);
  return res.status(200).json({ data: result });
});

const createReview = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const customerId = req.user.id;
  const data = req.body;

  const result = await reviewService.createReview(productId, customerId, data);

  return res.status(201).json({ data: result });
});

module.exports = {
  listReviews,
  createReview,
};
