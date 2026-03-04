// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Review");
const BaseService = require("../BaseService");

module.exports = new (class Reviews extends BaseService {
  async listByProduct(productId) {
    return this.findAllWithSort({ productId }, { createdAt: -1 });
  }

  async createReview({ productId, userId, name, rating, comment }) {
    const payload = {
      productId,
      userId: userId || null,
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    };

    return this.createObject(payload);
  }
})(model);


