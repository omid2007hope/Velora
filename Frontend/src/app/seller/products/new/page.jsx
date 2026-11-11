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

import SectionCard from "@/app/components/ui/SectionCard";
import SellerProductForm from "@/app/features/seller/components/product/SellerProductForm";

export default function SellerNewProductPage() {
  return (
    <SectionCard className="max-w-5xl">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          New Listing
        </p>
        <h1 className="mt-2 text-3xl font-bold text-amber-950">
          Add a product to your store
        </h1>
        <p className="mt-3 text-sm text-amber-800">
          Keep this page focused on product publishing. More seller tools can be
          added as separate routes without growing this file into a giant panel.
        </p>
      </div>

      <div className="mt-8">
        <SellerProductForm />
      </div>
    </SectionCard>
  );
}
