"use client";

import { useEffect, useState } from "react";
import {
  getStoredStoreOwner,
  subscribeToStorageChanges,
} from "@/app/lib/browser-storage";

export function useSellerSession() {
  const [storeOwner, setStoreOwner] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const syncStoreOwner = () => {
      setStoreOwner(getStoredStoreOwner());
      setHasHydrated(true);
    };

    syncStoreOwner();
    return subscribeToStorageChanges(syncStoreOwner);
  }, []);

  return {
    hasHydrated,
    storeOwner,
  };
}
