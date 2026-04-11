"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getStoredStoreOwner,
  getStoredUser,
  subscribeToStorageChanges,
} from "@/app/lib/browser-storage";

export default function AccountAccessGuard({ children }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [storeOwner, setStoreOwner] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const syncAuthState = () => {
      setUser(getStoredUser());
      setStoreOwner(getStoredStoreOwner());
      setReady(true);
    };

    syncAuthState();
    return subscribeToStorageChanges(syncAuthState);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (storeOwner) {
      router.replace("/");
      return;
    }

    if (!user) {
      router.replace("/?auth=login");
    }
  }, [ready, router, storeOwner, user]);

  if (!ready || storeOwner || !user) {
    return null;
  }

  return children;
}
