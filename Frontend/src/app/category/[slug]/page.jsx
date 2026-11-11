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
import CatalogPage from "@/app/features/catalog/CatalogPage";
import JsonLd from "@/app/components/seo/JsonLd";
import { getProducts } from "@/app/lib/server-api";
import { getCatalogFilters, getCatalogRoute } from "@/app/lib/catalog";
import { normalizeParam } from "@/app/features/catalog/utils/catalog-state";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildNoIndexMetadata,
  buildPageMetadata,
} from "@/app/lib/seo";

function buildCatalogDescription(route, search) {
  if (search) {
    return `Browse Velora search results for ${search} within the ${route.label.toLowerCase()} collection.`;
  }

  return route.description;
}

export async function generateMetadata({ params, searchParams }) {
  const route = getCatalogRoute(params?.slug);

  if (!route) {
    return buildNoIndexMetadata({
      title: "Collection not found",
      description: "The requested Velora collection could not be found.",
      path: "/products",
    });
  }

  const search = normalizeParam(searchParams?.search).trim();
  const hasQueryFilters =
    Boolean(search) ||
    Boolean(normalizeParam(searchParams?.new).trim()) ||
    Boolean(normalizeParam(searchParams?.category).trim()) ||
    Boolean(normalizeParam(searchParams?.subCategory).trim());

  return buildPageMetadata({
    title: search ? `Search results for "${search}"` : route.title,
    description: buildCatalogDescription(route, search),
    path: route.path,
    noIndex: hasQueryFilters,
    keywords: search ? [search, ...route.keywords] : route.keywords,
  });
}

export default async function CategoryPage({ params, searchParams }) {
  const route = getCatalogRoute(params?.slug);

  if (!route) {
    notFound();
  }

  const search = normalizeParam(searchParams?.search).trim();
  const filters = getCatalogFilters(params?.slug);
  const products = await getProducts({
    ...filters,
    search: search || undefined,
  }).catch(() => []);

  const title = search ? `Search results for "${search}"` : route.title;
  const description = buildCatalogDescription(route, search);

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: route.label, path: route.path },
          ]),
          buildCollectionPageSchema({
            title,
            description,
            path: route.path,
            products,
          }),
        ]}
      />
      <CatalogPage
        initialState={{
          ...filters,
          search,
          category: filters.category || "",
          subCategory: filters.subCategory || "",
          isNew: Boolean(filters.isNew),
        }}
      />
    </>
  );
}
