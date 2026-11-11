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

import CatalogPage from "@/app/features/catalog/CatalogPage";
import JsonLd from "@/app/components/seo/JsonLd";
import { getProducts } from "@/app/lib/server-api";
import {
  buildCatalogSeo,
  getProductsRouteState,
} from "@/app/features/catalog/utils/catalog-state";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildPageMetadata,
} from "@/app/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const state = getProductsRouteState(searchParams);
  const products = await getProducts({
    category: state.category || undefined,
    subCategory: state.subCategory || undefined,
    isNew: state.isNew,
    search: state.search || undefined,
  }).catch(() => []);
  const seo = buildCatalogSeo(state, products.length);

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    noIndex: seo.noIndex,
    keywords: seo.keywords,
  });
}

export default async function ProductsPage({ searchParams }) {
  const state = getProductsRouteState(searchParams);
  const products = await getProducts({
    category: state.category || undefined,
    subCategory: state.subCategory || undefined,
    isNew: state.isNew,
    search: state.search || undefined,
  }).catch(() => []);
  const seo = buildCatalogSeo(state, products.length);

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: seo.heading, path: seo.path },
          ]),
          buildCollectionPageSchema({
            title: seo.heading,
            description: seo.description,
            path: seo.path,
            products,
          }),
        ]}
      />
      <CatalogPage initialState={state} />
    </>
  );
}
