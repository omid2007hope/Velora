"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/features/catalog/services/catalog-service";

export function useCatalogProducts(filters) {
  const { category, subCategory, isNew, search } = filters;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts({
          category,
          subCategory,
          isNew,
          search,
        });

        if (!active) return;

        setProducts(data || []);
        setError(null);
      } catch {
        if (!active) return;

        setProducts([]);
        setError("We couldn't load the catalog right now.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [category, subCategory, isNew, search]);

  return { products, loading, error };
}
