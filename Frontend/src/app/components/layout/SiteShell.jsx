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
