"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listSellerStore } from "@/app/features/seller/services/seller-store-service";

export function useSellerStores() {
  const storeOwner = useSelector((state) => state.auth.storeOwner);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadStores() {
      setLoading(true);
      setError("");

      try {
        const data = await listSellerStore();

        if (!ignore) {
          setStores(Array.isArray(data) ? data : []);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(
            requestError?.response?.data?.error ||
              requestError?.message ||
              "Could not load seller stores.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadStores();

    return () => {
      ignore = true;
    };
  }, [storeOwner]);

  return {
    stores,
    loading,
    error,
    setStores,
  };
}
