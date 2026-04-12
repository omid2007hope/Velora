"use client";

import Link from "next/link";
import SectionCard from "@/app/components/ui/SectionCard";
import SellerProductsOverview from "@/app/features/seller/components/SellerProductsOverview";
import { useSellerSession } from "@/app/features/seller/hooks/use-seller-session";

export default function SellerDashboardPage() {
  const { storeOwner } = useSellerSession();

  return (
    <div className="space-y-6">
      <SectionCard className="overflow-hidden border-none bg-gradient-to-br from-amber-950 via-amber-900 to-orange-800 p-0 text-orange-50 shadow-[0_30px_80px_rgba(120,53,15,0.28)]">
        <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.7fr_1fr] md:px-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-200">
              Seller Panel
            </p>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                Welcome back
                {storeOwner?.fullName ? `, ${storeOwner.fullName}` : ""}.
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-orange-100 md:text-base">
                This is your base seller workspace for listing products and
                growing the rest of the panel later.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/seller/products/new"
                className="inline-flex items-center justify-center rounded-full bg-orange-50 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-white"
              >
                Add a product
              </Link>
              <a
                href="#seller-products"
                className="inline-flex items-center justify-center rounded-full border border-orange-200/70 px-5 py-3 text-sm font-semibold text-orange-50 transition hover:bg-white/10"
              >
                View your listings
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div className="rounded-3xl border border-orange-200/20 bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                Current focus
              </p>
              <p className="mt-2 text-lg font-semibold">Product publishing</p>
              <p className="mt-2 text-sm text-orange-100">
                Start with product creation now. Store setup, analytics, and
                advanced tools can plug into this layout later.
              </p>
            </div>

            <div className="rounded-3xl border border-orange-200/20 bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                Seller status
              </p>
              <p className="mt-2 text-lg font-semibold">
                {storeOwner?.isEmailVerified
                  ? "Verified seller"
                  : "Verification pending"}
              </p>
              <p className="mt-2 text-sm text-orange-100">
                Use your seller account to manage products in one dedicated
                area.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SellerProductsOverview />
    </div>
  );
}
