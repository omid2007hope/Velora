import client from "@/api/client";

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function getReviews(productId) {
  if (!productId) throw new Error("productId is required");

  const response = await client.get(`/server/products/${productId}/reviews`);
  return response.data?.data || [];
}

export async function createReview(productId, payload) {
  if (!productId) throw new Error("productId is required");

  const response = await client.post(`/server/products/${productId}/reviews`, payload);
  return response.data?.data;
}
