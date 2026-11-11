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

import { notFound } from "next/navigation";
import ProductDetailClientPage from "@/app/features/product/ProductDetailPage";
import JsonLd from "@/app/components/seo/JsonLd";
import { getProductById, getReviewsByProductId } from "@/app/lib/server-api";
import {
  buildBreadcrumbSchema,
  buildNoIndexMetadata,
  buildPageMetadata,
  buildProductSchema,
  sanitizeDescription,
} from "@/app/lib/seo";

function buildProductDescription(product) {
  if (!product) {
    return "The requested Velora product could not be found.";
  }

  const price = product.newPrice ?? product.price;
  const parts = [product.description];

  if (product.category) {
    parts.push(`Category: ${product.category}.`);
  }

  if (Number.isFinite(price)) {
    parts.push(`Available now for $${price}.`);
  }

  return sanitizeDescription(parts.join(" "));
}

export async function generateMetadata({ params }) {
  const productId = params?.id;
  const result = await getProductById(productId).catch(() => ({
    product: null,
    notFound: false,
    unavailable: true,
  }));

  if (result.notFound) {
    return buildNoIndexMetadata({
      title: "Product not found",
      description: "The requested Velora product could not be found.",
      path: `/products/${productId}`,
    });
  }

  if (!result.product) {
    return buildPageMetadata({
      title: "Product details",
      description:
        "Explore product details, pricing, and availability from Velora.",
      path: `/products/${productId}`,
      keywords: ["product details"],
    });
  }

  const product = result.product;

  return buildPageMetadata({
    title: product.name,
    description: buildProductDescription(product),
    path: `/products/${productId}`,
    image: `/products/${productId}/opengraph-image`,
    keywords: [product.category, product.name],
  });
}

export default async function ProductDetailRoute({ params }) {
  const productId = params?.id;
  const result = await getProductById(productId).catch(() => ({
    product: null,
    notFound: false,
  }));

  if (result.notFound) {
    notFound();
  }

  const product = result.product;
  const reviews = product
    ? await getReviewsByProductId(productId).catch(() => [])
    : [];

  return (
    <>
      <JsonLd
        data={
          product
            ? [
                buildBreadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Products", path: "/products" },
                  { name: product.name, path: `/products/${productId}` },
                ]),
                buildProductSchema({ product, reviews }),
              ]
            : null
        }
      />
      <ProductDetailClientPage productId={productId} />
    </>
  );
}
