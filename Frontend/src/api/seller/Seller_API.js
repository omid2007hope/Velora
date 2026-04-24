/**
 * Seller_API — seller dashboard product management.
 * All endpoints require an authenticated seller token (handled by client interceptor).
 */
import client from "@/api/client";

// ─── Seller Products ──────────────────────────────────────────────────────────

export async function getSellerProducts() {
  const response = await client.get("/server/seller/products");
  return response.data?.data ?? [];
}

export async function createSellerProduct(payload) {
  const response = await client.post("/server/seller/products", payload);
  return response.data?.data;
}

// Store

export async function getSellerStore(id) {
  if (!id) throw new Error("Store Owner ID is required");
  const response = await client.get(`/server/seller/store/${id}`);
  return response.data?.data ?? [];
}

export async function createAnStore(payload) {
  const response = await client.post("/server/seller/store", payload);
  return response.data?.data;
}
