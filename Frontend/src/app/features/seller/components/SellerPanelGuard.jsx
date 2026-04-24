"use client";

import { useDispatch } from "react-redux";
import SectionCard from "@/app/components/ui/SectionCard";
import { openSellerPopup } from "@/app/redux/slice/authSlice";
import { useSellerSession } from "@/app/features/seller/hooks/use-seller-session";

export default function SellerPanelGuard({ children }) {
  const dispatch = useDispatch();
  const { storeOwner, hasHydrated } = useSellerSession();

  if (!hasHydrated) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionCard className="animate-pulse bg-orange-50">
          <div className="h-8 w-48 rounded bg-orange-200" />
          <div className="mt-4 h-4 w-full max-w-xl rounded bg-orange-100" />
          <div className="mt-8 h-12 w-40 rounded-full bg-orange-200" />
        </SectionCard>
      </div>
    );
  }

  if (!storeOwner) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionCard className="border-none bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 shadow-[0_25px_70px_rgba(120,53,15,0.16)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            Seller Access
          </p>
          <h1 className="mt-2 text-3xl font-bold text-amber-950">
            Sign in to open your seller panel
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-amber-800">
            This area is for store owners who want to publish products and
            manage their store from the website.
          </p>
          <button
            type="button"
            onClick={() => dispatch(openSellerPopup())}
            className="mt-8 inline-flex rounded-full bg-amber-950 px-5 py-3 text-sm font-semibold text-orange-50 transition hover:bg-amber-900"
          >
            Open seller sign in
          </button>
        </SectionCard>
      </div>
    );
  }

  return children;
}
