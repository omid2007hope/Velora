const express = require("express");
const { createReview } = require("../../../controller/ReviewController");
const requireCustomer = require("../../../middleware/auth/system/Customer");

const {
  validateReviewProductId,
  validateCreateReview,
} = require("../../../middleware/validation/ReviewValidation");

const router = express.Router();

router.post(
  "/products/:productId/reviews",
  requireCustomer,
  validateReviewProductId,
  validateCreateReview,
  createReview
);

module.exports = router;
