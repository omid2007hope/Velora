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
