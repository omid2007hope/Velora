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

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ProductSearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center" role="search">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <input
        id="product-search"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex-1 rounded-l-lg border-2 border-amber-950 bg-orange-50 px-0.5 md:px-0.5 lg:px-1 py-2 md:py-2 lg:py-2 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700 mt-0 md:mt-4 lg:mt-0 ml-2"
      />
      <button
        type="submit"
        aria-label="Submit product search"
        className="flex items-center justify-center rounded-r-lg border-2 border-amber-950 bg-amber-950 px-3 py-[0.625rem] text-orange-50 transition hover:bg-amber-800 mt-0 md:mt-4 lg:mt-0 mr-2"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
