"use client";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import { listSellerStore } from "@/app/features/seller/services/seller-store-service";
import { useHandleApi } from "@/app/lib/function";

export function useSellerStores() {
  const storeOwnerId = useSelector(
    (state) => state.auth.storeOwner?._id ?? null,
  );
  const apiFn = useCallback(() => listSellerStore(), [storeOwnerId]);
  const {
    dataList: stores,
    loading,
    error,
    setDataList: setStores,
  } = useHandleApi(apiFn);

  return {
    stores,
    loading,
    error,
    setStores,
  };
}
