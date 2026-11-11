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

"use client";

import { useCallback } from "react";
import { fetchProducts } from "@/app/features/catalog/services/catalog-service";
import { useHandleApi } from "@/app/lib/function";

export function useCatalogProducts(filters) {
  const { category, subCategory, isNew, search } = filters;
  const apiFn = useCallback(
    () =>
      fetchProducts({
        category,
        subCategory,
        isNew,
        search,
      }),
    [category, subCategory, isNew, search],
  );
  const { dataList: products, loading, error } = useHandleApi(apiFn);

  return {
    products,
    loading,
    error: error || null,
  };
}
