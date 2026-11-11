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
