// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
