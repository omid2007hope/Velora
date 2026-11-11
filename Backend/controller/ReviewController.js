/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
