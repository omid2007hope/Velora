const express = require("express");
const { listReviews } = require("../../../api/controller/ReviewController");
const {
  validateReviewProductId,
} = require("../../../middleware/validation/ReviewValidation");

const router = express.Router();

router.get(
  "/products/:productId/reviews",
  validateReviewProductId,
  listReviews,
);

module.exports = router;

