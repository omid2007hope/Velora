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

import { getProducts } from "@/app/lib/server-api";
import { absoluteUrl } from "@/app/lib/site";
import { catalogRoutes } from "@/app/lib/catalog";

export default async function sitemap() {
  const now = new Date();
  const products = await getProducts().catch(() => []);
  const staticRoutes = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/products"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...catalogRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    })),
  ];

  const productRoutes = products
    .map((product) => {
      const productId = product?._id || product?.id;

      if (!productId) {
        return null;
      }

      return {
        url: absoluteUrl(`/products/${productId}`),
        lastModified: product.updatedAt || product.createdAt || now,
        changeFrequency: "weekly",
        priority: 0.8,
      };
    })
    .filter(Boolean);

  return Array.from(
    new Map([...staticRoutes, ...productRoutes].map((entry) => [entry.url, entry]))
      .values(),
  );
}
