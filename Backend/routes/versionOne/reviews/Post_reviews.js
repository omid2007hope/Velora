const express = require("express");
const { createReview } = require("../../../controller/ReviewController");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const {
  validateReviewProductId,
  validateCreateReview,
} = require("../../../middleware/validation/ReviewValidation");

const router = express.Router();

router.post(
  "/products/:productId/reviews",
  requireAuth,
  validateReviewProductId,
  validateCreateReview,
  createReview,
);

module.exports = router;
