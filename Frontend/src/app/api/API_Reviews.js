// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

export async function fetchReviews(productId) {
  if (!productId) throw new Error("productId is required");
  const res = await axios.get(
    `${API_BaseURL}/server/products/${productId}/reviews`,
  );
  return res.data?.data || [];
}

export async function createReview(productId, payload) {
  if (!productId) throw new Error("productId is required");
  const res = await axios.post(
    `${API_BaseURL}/server/products/${productId}/reviews`,
    payload,
  );
  return res.data?.data;
}

export default { fetchReviews, createReview };


