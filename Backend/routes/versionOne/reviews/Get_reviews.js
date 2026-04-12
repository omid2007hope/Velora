const express = require("express");
const { listReviews } = require("../../../controller/ReviewController");
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
