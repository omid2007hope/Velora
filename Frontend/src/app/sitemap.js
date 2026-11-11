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
