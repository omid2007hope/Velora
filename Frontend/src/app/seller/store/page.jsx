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

import SectionCard from "@/app/components/ui/SectionCard";
import SellerStoreForm from "@/app/features/seller/components/store/SellerStoreForm";

export default function SellerStorePage() {
  return (
    <SectionCard className="max-w-5xl">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          New Store
        </p>
        <h1 className="mt-2 text-3xl font-bold text-amber-950">
          Create your store
        </h1>
        <p className="mt-3 text-sm text-amber-800">
          Keep this page focused on store creation. More seller tools can be
          added as separate routes without growing this file into a giant panel.
        </p>
      </div>

      <div className="mt-8">
        <SellerStoreForm />
      </div>
    </SectionCard>
  );
}
