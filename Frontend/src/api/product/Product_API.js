/**
 * Product_API — product listing, detail, and reviews.
 */
import client from "@/api/client";

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(params = {}) {
  const { category, subCategory, isNew, search } = params;
  const query = new URLSearchParams();

  if (category) query.set("category", category);
  if (subCategory) query.set("subCategory", subCategory);
  if (isNew === true) query.set("new", "true");
  if (search) query.set("search", search);

  const path = query.size
    ? `/server/products?${query.toString()}`
    : "/server/products";

  const response = await client.get(path);
  return response.data?.data || [];
}

export async function getProductById(id) {
  if (!id) throw new Error("Product id is required");

  const response = await client.get(`/server/products/${id}`);
  return response.data?.data;
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function getReviews(productId) {
  if (!productId) throw new Error("productId is required");

  const response = await client.get(`/server/products/${productId}/reviews`);
  return response.data?.data || [];
}

export async function createReview(productId, payload) {
  if (!productId) throw new Error("productId is required");

  const response = await client.post(
    `/server/products/${productId}/reviews`,
    payload,
  );
  return response.data?.data;
}
