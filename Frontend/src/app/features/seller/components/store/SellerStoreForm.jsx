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

import { useSellerStoreForm } from "@/app/features/seller/hooks/store/use-seller-store-form";
import StoreCreatedPopup from "../StoreCreatedPopup";
import { useState } from "react";

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-amber-950/15 bg-orange-50 px-4 py-3 text-sm text-amber-950 outline-none transition placeholder:text-amber-500 focus:border-amber-900 focus:bg-white";

export default function SellerStoreForm() {
  const { form, saving, error, successMessage, updateField, handleSubmit } =
    useSellerStoreForm();

  const [open, setOpen] = useState(false);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-medium text-amber-950">
          Store name
          <input
            required
            value={form.storeName}
            onChange={updateField("storeName")}
            className={fieldClassName}
            placeholder="Velora Store"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          Country
          <input
            required
            value={form.countryStoreLocatedIn}
            onChange={updateField("countryStoreLocatedIn")}
            className={fieldClassName}
            placeholder="United States"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          State or Province
          <input
            value={form.stateOrProvinceStoreLocatedIn}
            onChange={updateField("stateOrProvinceStoreLocatedIn")}
            className={fieldClassName}
            placeholder="California"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          City
          <input
            required
            value={form.cityStoreLocatedIn}
            onChange={updateField("cityStoreLocatedIn")}
            className={fieldClassName}
            placeholder="Los Angeles"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          Address
          <input
            required
            value={form.storeAddress}
            onChange={updateField("storeAddress")}
            className={fieldClassName}
            placeholder="123 Main St"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          Zipcode
          <input
            required
            value={form.storeZipcode}
            onChange={updateField("storeZipcode")}
            className={fieldClassName}
            placeholder="90210"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-amber-950">
        Store description
        <textarea
          required
          value={form.storeDescription}
          onChange={updateField("storeDescription")}
          className={`${fieldClassName} min-h-36 resize-y`}
          placeholder="Describe your store, its mission, and what makes it unique."
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setOpen(true)}
          type="submit"
          disabled={saving}
          className="inline-flex rounded-full bg-amber-950 px-5 py-3 text-sm font-semibold text-orange-50 transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Creating..." : "Create store"}
        </button>
      </div>
      <StoreCreatedPopup open={open} setOpen={setOpen} />
    </form>
  );
}
