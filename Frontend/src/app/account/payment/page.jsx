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

import Link from "next/link";
import AccountShell from "@/app/components/account/AccountShell";
import SectionCard from "@/app/components/ui/SectionCard";
import { usePaymentForm } from "@/app/features/account/hooks/use-payment-form";

const inputClass =
  "w-full rounded border border-amber-950 bg-amber-50 p-2 text-sm";

export default function PaymentPage() {
  const { form, saving, updateField, savePaymentMethod } = usePaymentForm();

  async function handleSave(event) {
    event.preventDefault();

    try {
      await savePaymentMethod();
      alert("Payment method saved");
    } catch (error) {
      alert(error.message || "Failed to save payment method");
    }
  }

  return (
    <AccountShell>
      <SectionCard className="w-full max-w-lg">
        <h2 className="mb-2 text-lg font-bold">Payment Methods</h2>
        <p className="mb-4 text-xs">
          Add or update your payment details. Your information is stored securely.
        </p>

        <form onSubmit={handleSave} className="space-y-3">
          <input
            name="billingName"
            placeholder="Billing Name"
            value={form.billingName}
            autoComplete="cc-name"
            onChange={updateField}
            className={inputClass}
          />
          <input
            name="paymentMethodId"
            placeholder="Stripe payment method ID (pm_...)"
            value={form.paymentMethodId}
            onChange={updateField}
            className={inputClass}
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-[#5B2C00] px-4 py-2 text-sm text-white hover:bg-amber-900"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <Link
              href="/"
              className="rounded-md bg-orange-100 px-4 py-2 text-sm text-amber-900 shadow transition hover:bg-amber-950 hover:text-orange-50"
            >
              Continue to shop
            </Link>
          </div>
        </form>
      </SectionCard>
    </AccountShell>
  );
}
