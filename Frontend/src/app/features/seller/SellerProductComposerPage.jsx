"use client";

import SectionCard from "@/app/components/ui/SectionCard";
import SellerProductForm from "@/app/features/seller/components/SellerProductForm";

export default function SellerProductComposerPage() {
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
