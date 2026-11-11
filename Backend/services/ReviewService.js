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

const Review = require("../model/Review");
const BaseService = require("./BaseService");

module.exports = new (class ReviewService extends BaseService {
  async listReviewsByProduct(productId) {
    return this.model.find({ productId, isDeleted: { $ne: true } }).sort({ createdAt: -1 });
  }

  async createReview(pId, uId, payload) {
    const normalizedData = {
      productId: pId,
      userId: uId,
      name: payload.name.trim(),
      rating: Number(payload.rating),
      comment: payload.comment.trim(),
    };

    return this.createObject(normalizedData);
  }
})(Review);
