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

import { Suspense } from "react";
import Header from "@/app/components/layout/header/Header";

export default function SiteShell({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-2 z-50 -translate-y-16 rounded-md border border-amber-900 bg-white px-3 py-2 text-amber-950 shadow focus:translate-y-0 focus:outline-none"
      >
        Skip to main content
      </a>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main id="main-content" tabIndex="-1" className="block focus:outline-none">
        {children}
      </main>
    </>
  );
}
