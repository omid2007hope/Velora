/**
 * Seller_API — seller dashboard product management.
 * All endpoints require an authenticated seller token (handled by client interceptor).
 */
import client from "@/api/client";


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
