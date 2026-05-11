"use client";

import { useEffect, useRef, useState } from "react";
import { Store, ChevronDown, Check, AlertCircle } from "lucide-react";
import { listSellerStore } from "@/app/features/seller/services/seller-store-service";

export default function StoreSelector({ selectedStoreId, onSelect }) {
  const [stores, setStores] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    listSellerStore().then((data) => {
      setStores(data);
      // Auto-select the first store if nothing is selected yet
      if (data.length > 0 && !selectedStoreId) {
        onSelect(data[0]._id, data[0]);
      }
      setLoading(false);
    });
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = stores.find((s) => s._id === selectedStoreId);

  if (loading) {
    return (
      <div className="h-14 w-full animate-pulse rounded-2xl bg-orange-100" />
    );
  }

  if (stores.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <AlertCircle className="size-4 shrink-0" />
        You don&apos;t have any stores yet. Create one first.
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <p className="mb-2 text-sm font-medium text-amber-950">
        Post under store
      </p>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-2xl border border-amber-950/15 bg-orange-50 px-4 py-3 text-left text-sm text-amber-950 transition hover:border-amber-900 hover:bg-white focus:outline-none"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-amber-950/10">
          <Store className="size-4 text-amber-950" />
        </span>
        <span className="flex-1 truncate font-medium">
          {selected ? selected.storeName : "Select a store"}
        </span>
        {selected && (
          <span className="shrink-0 text-xs text-amber-700">
            {selected.cityStoreLocatedIn}, {selected.countryStoreLocatedIn}
          </span>
        )}
        <ChevronDown
          className={`size-4 shrink-0 text-amber-700 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-amber-950/10 bg-white shadow-[0_16px_40px_rgba(120,53,15,0.16)]">
          {stores.map((store) => {
            const isActive = store._id === selectedStoreId;
            return (
              <li key={store._id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(store._id, store);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition ${
                    isActive
                      ? "bg-amber-950 text-orange-50"
                      : "text-amber-950 hover:bg-orange-50"
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${
                      isActive ? "bg-white/15" : "bg-amber-950/10"
                    }`}
                  >
                    <Store className="size-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium">{store.storeName}</span>
                    <span
                      className={`block text-xs ${isActive ? "text-orange-200" : "text-amber-600"}`}
                    >
                      {store.cityStoreLocatedIn}, {store.countryStoreLocatedIn}
                    </span>
                  </span>
                  {isActive && <Check className="size-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
