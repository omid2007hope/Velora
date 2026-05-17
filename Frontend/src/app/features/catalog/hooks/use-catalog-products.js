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
