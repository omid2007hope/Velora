/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
