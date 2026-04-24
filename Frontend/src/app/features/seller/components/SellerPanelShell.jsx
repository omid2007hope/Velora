"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Plus, LayoutDashboard, ArrowLeft } from "lucide-react";
import { sellerNavigation } from "@/app/features/seller/constants/seller-navigation";
import { useSellerSession } from "@/app/features/seller/hooks/use-seller-session";

function getNavIcon(icon) {
  if (icon === "create") {
    return Plus;
  }

  if (icon === "dashboard") {
    return LayoutDashboard;
  }

  return LayoutDashboard;
}

export default function SellerPanelShell({ children }) {
  const pathname = usePathname();
  const { storeOwner } = useSellerSession();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#ffedd5_40%,#fff7ed_100%)] pt-28">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="h-fit rounded-[2rem] border border-amber-950/10 bg-white/80 p-5 shadow-[0_20px_60px_rgba(120,53,15,0.12)] backdrop-blur">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-amber-950 via-amber-900 to-orange-800 p-5 text-orange-50">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
              <Store className="size-6" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
              Velora Seller
            </p>
            <h2 className="mt-2 text-xl font-bold">
              {storeOwner?.fullName || "Store owner"}
            </h2>
            <p className="mt-2 text-sm text-orange-100">
              {storeOwner?.email || "seller@velora.com"}
            </p>
          </div>

          <nav className="mt-5 space-y-2">
            {sellerNavigation.map((item) => {
              const Icon = getNavIcon(item.icon);
              const isActive =
                item.href === "/seller"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-amber-950 text-orange-50 shadow-[0_16px_30px_rgba(120,53,15,0.24)]"
                      : "text-amber-950 hover:bg-orange-100"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-amber-950 p-2.5 font-bold text-amber-950 transition hover:bg-amber-950 hover:text-white mt-5"
          >
            <ArrowLeft /> Back
          </Link>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
