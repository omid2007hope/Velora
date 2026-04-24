"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountAccessGuard({ children }) {
  const user = useSelector((state) => state.auth.user);
  const storeOwner = useSelector((state) => state.auth.storeOwner);
  const hydrated = useSelector((state) => state.auth.hydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;

    if (storeOwner) {
      router.replace("/");
      return;
    }

    if (!user) {
      router.replace("/?auth=login");
    }
  }, [hydrated, router, storeOwner, user]);

  if (!hydrated || storeOwner || !user) {
    return null;
  }

  return children;
}
