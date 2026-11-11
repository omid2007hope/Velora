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

import { getApiBaseUrl } from "./site";

function createApiUrl(path) {
  return new URL(path.replace(/^\//, ""), `${getApiBaseUrl()}/`);
}

function shouldSkipBuildTimeRequest() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    process.env.NODE_ENV === "production" &&
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(apiBaseUrl)
  );
}

async function fetchApiJson(
  path,
  { headers, next = { revalidate: 300 }, fallbackData = null, ...init } = {},
) {
  if (shouldSkipBuildTimeRequest()) {
    return {
      data: fallbackData,
      notFound: false,
      unavailable: true,
    };
  }

  let response;

  try {
    response = await fetch(createApiUrl(path), {
      ...init,
      headers: {
        accept: "application/json",
        ...headers,
      },
      next,
    });
  } catch (error) {
    console.warn(`Failed to fetch ${path}: ${error.message}`);
    return {
      data: fallbackData,
      notFound: false,
      unavailable: true,
    };
  }

  if (response.status === 404) {
    return { data: null, notFound: true };
  }

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return {
    data: payload?.data ?? null,
    notFound: false,
    unavailable: false,
  };
}

function buildProductsQuery({ category, isNew, search } = {}) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (isNew === true) {
    params.set("new", "true");
  }

  if (search) {
    params.set("search", search);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export async function getProducts(params = {}) {
  const result = await fetchApiJson(
    `/server/products${buildProductsQuery(params)}`,
    { fallbackData: [] },
  );

  return Array.isArray(result.data) ? result.data : [];
}

export async function getProductById(id) {
  if (!id) {
    return { product: null, notFound: true, unavailable: false };
  }

  const result = await fetchApiJson(`/server/products/${id}`, {
    fallbackData: null,
  });
  return {
    product: result.data,
    notFound: result.notFound,
    unavailable: result.unavailable,
  };
}

export async function getReviewsByProductId(productId) {
  if (!productId) {
    return [];
  }

  const result = await fetchApiJson(`/server/products/${productId}/reviews`, {
    fallbackData: [],
  });
  return Array.isArray(result.data) ? result.data : [];
}
