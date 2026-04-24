"use client";

import { useSelector } from "react-redux";

export function useSellerSession() {
  const storeOwner = useSelector((state) => state.auth.storeOwner);
  const hasHydrated = useSelector((state) => state.auth.hydrated);

  return {
    hasHydrated,
    storeOwner,
  };
}
