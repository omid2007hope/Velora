import axios from "axios";
import { apiBaseUrl } from "@/services/api-base-url";

export async function fetchReviews(productId) {
  if (!productId) {
    throw new Error("productId is required");
  }

  const response = await axios.get(
    `${apiBaseUrl}/server/products/${productId}/reviews`,
  );

  return response.data?.data || [];
}

export async function createReview(productId, payload) {
  if (!productId) {
    throw new Error("productId is required");
  }

  const response = await axios.post(
    `${apiBaseUrl}/server/products/${productId}/reviews`,
    payload,
  );

  return response.data?.data;
}
