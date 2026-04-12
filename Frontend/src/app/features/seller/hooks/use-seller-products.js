"use client";

import { useEffect, useState } from "react";
import { listSellerProducts } from "@/app/features/seller/services/seller-products-service";

export function useSellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const data = await listSellerProducts();

        if (!ignore) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(
            requestError?.response?.data?.error ||
              requestError?.message ||
              "Could not load seller products.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    products,
    loading,
    error,
    setProducts,
  };
}
