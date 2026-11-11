// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
