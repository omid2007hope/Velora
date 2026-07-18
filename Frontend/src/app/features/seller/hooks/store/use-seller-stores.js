"use client";

import { useCallback } from "react";
import { listSellerStore } from "@/app/features/seller/services/seller-store-service";
import { useHandleApi } from "@/app/lib/function";

export function useSellerStores() {
  const apiFn = useCallback(() => listSellerStore(), []);
  const { dataList: stores, loading, error, setDataList: setStores } = useHandleApi(apiFn);

  return {
    stores,
    loading,
    error,
    setStores,
  };
}
