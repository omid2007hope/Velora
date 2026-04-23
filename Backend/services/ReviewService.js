const Review = require("../model/Review");
const BaseService = require("./BaseService");

module.exports = new (class ReviewService extends BaseService {
  async listReviewsByProduct(productId) {
    return this.model
      .find({ productId, isDeleted: { $ne: true } })
      .sort({ createdAt: -1 });
  }

  async createReview({ productId, userId, name, rating, comment }) {
    return this.createObject({
      productId,
      userId: userId || null,
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    });
  }
})(Review);
