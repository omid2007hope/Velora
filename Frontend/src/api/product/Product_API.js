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
    ? `/server/seller/products?${query.toString()}`
    : "/server/seller/products";

  const response = await client.get(path);
  return response.data?.data || [];
}

export async function getProductById(id) {
  if (!id) throw new Error("Product id is required");

  const response = await client.get(`/server/products/${id}`);
  return response.data?.data;
}

export async function createSellerProduct(payload) {
  const response = await client.post("/server/seller/products", payload);
  return response.data?.data;
}

export async function patchProduct(id) {
  if (!id) throw new Error("Product id is required");

  const response = await client.patch(`/server/seller/products/${id}`);
  return response.data?.data;
}

export async function deleteProductById(id) {
  if (!id) throw new Error("Product id is required");
  const response = await client.delete(`/server/seller/products/${id}`);
  return response.data?.data;
}
