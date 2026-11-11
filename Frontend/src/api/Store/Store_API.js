/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

/**
 * Seller_API — seller dashboard product management.
 * All endpoints require an authenticated seller token (handled by client interceptor).
 */
import client from "@/api/client";

// Store

export async function getAllStore() {
  const response = await client.get("/server/seller/store");
  //! console.log("getSellerStore response:", response.data?.data); // Log the response
  return response.data?.data ?? [];
}

export async function createAnStore(payload) {
  const response = await client.post("/server/seller/store", payload);
  return response.data?.data;
}

export async function patchAnStore(id, payload) {
  const response = await client.patch(`/server/seller/store/${id}`, payload);
  return response.data?.data;
}

export async function deleteAnStore(id) {
  const response = await client.delete(`/server/seller/store/${id}`);
  return response.data?.data;
}
