// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
