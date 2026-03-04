const reviewService = require("../../service/version_1/Reviews");

async function listReviews(req, res) {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.listByProduct(productId);
    return res.status(200).json({ data: reviews });
  } catch (error) {
    console.error("listReviews error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function createReview(req, res) {
  try {
    const { productId } = req.params;
    const { userId, name, rating, comment } = req.body || {};

    if (!name || !rating || !comment) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["name", "rating", "comment"],
      });
    }

    const saved = await reviewService.createReview({
      productId,
      userId,
      name,
      rating,
      comment,
    });

    return res.status(201).json({ data: saved });
  } catch (error) {
    console.error("createReview error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  listReviews,
  createReview,
};
