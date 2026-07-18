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
