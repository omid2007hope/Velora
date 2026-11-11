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
