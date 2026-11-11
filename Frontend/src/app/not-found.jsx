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

import Link from "next/link";
import { buildNoIndexMetadata } from "@/app/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Page Not Found – 404",
  description:
    "The page you requested does not exist or may have been removed from the Velora catalog. Browse our collections to find what you are looking for.",
  path: "/404",
});

export default function NotFound() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-24 text-amber-950">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border-2 border-amber-950 bg-orange-100 px-8 py-16 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-base text-amber-900 sm:text-lg">
          The page you requested does not exist or may have been removed from
          the current Velora catalog.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-amber-950 px-6 py-3 text-sm font-semibold text-orange-50 transition hover:bg-amber-900"
          >
            Go home
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-amber-950 px-6 py-3 text-sm font-semibold transition hover:bg-orange-200"
          >
            Browse products
          </Link>
        </div>
      </div>
    </main>
  );
}
