const asyncHandler = require("../utils/asyncHandler");
const reviewService = require("../services/ReviewService");

const listReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.listReviewsByProduct(req.params.productId);
  return res.status(200).json({ data: reviews });
});

const createReview = asyncHandler(async (req, res) => {
  const savedReview = await reviewService.createReview({
    productId: req.params.productId,
    userId: req.body.userId,
    name: req.body.name,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  return res.status(201).json({ data: savedReview });
});

module.exports = {
  listReviews,
  createReview,
};
