const express = require("express");
const { listReviews } = require("../../../controller/ReviewController");
const {
  validateReviewProductId,
} = require("../../../middleware/validation/ReviewValidation");

const router = express.Router();

router.get(
  "/server/products/:productId/reviews",
  validateReviewProductId,
  listReviews,
);

module.exports = router;
