"use client";

import { listSellerProducts } from "@/app/features/seller/services/seller-products-service";
import { useHandleApi } from "@/app/lib/function";

export function useSellerProducts() {
  const {
    dataList: products,
    loading,
    error,
    setDataList: setProducts,
  } = useHandleApi(listSellerProducts);
  return { products, loading, error, setProducts };
}
