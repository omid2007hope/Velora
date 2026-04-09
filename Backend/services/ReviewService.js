const Review = require("../model/Review");

async function listReviewsByProduct(productId) {
  return Review.find({
    productId,
    isDeleted: { $ne: true },
  }).sort({ createdAt: -1 });
}

async function createReview({ productId, userId, name, rating, comment }) {
  const review = new Review({
    productId,
    userId: userId || null,
    name: name.trim(),
    rating: Number(rating),
    comment: comment.trim(),
  });

  return review.save();
}

module.exports = {
  listReviewsByProduct,
  createReview,
};
