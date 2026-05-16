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

export async function deleteProductById(id) {
  if (!id) throw new Error("Product id is required");
  const response = await client.delete(`/server/seller/products/${id}`);
  return response.data?.data;
}

// Store

export async function getSellerStore() {
  const response = await client.get("/server/seller/store");
  //! console.log("getSellerStore response:", response.data?.data); // Log the response
  return response.data?.data ?? [];
}

export async function createAnStore(payload) {
  const response = await client.post("/server/seller/store", payload);
  return response.data?.data;
}

export async function patchAnStore(id, payload) {
  const response = await client.patch(`/server/seller/store${id}`, payload);
  return response.data?.data;
}

export async function deleteAnStore() {
  const response = await client.patch(`/server/seller/store${id}`);
  return response.data?.data;
}
