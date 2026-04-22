"use client";

import SectionCard from "@/app/components/ui/SectionCard";
import SellerStoreForm from "@/app/features/seller/components/store/SellerStoreForm";

export default function SellerStoreComposerPage() {
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
