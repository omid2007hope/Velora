const express = require("express");
const { createReview } = require("../../../controller/ReviewController");
const {
  validateReviewProductId,
  validateCreateReview,
} = require("../../../middleware/validation/ReviewValidation");

const router = express.Router();

router.post(
  "/products/:productId/reviews",
  validateReviewProductId,
  validateCreateReview,
  createReview,
);

module.exports = router;
