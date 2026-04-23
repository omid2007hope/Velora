"use client";

import Link from "next/link";
import AccountShell from "@/app/components/account/AccountShell";
import SectionCard from "@/app/components/ui/SectionCard";
import { useAddressForm } from "@/app/features/account/hooks/use-address-form";

const inputClass =
  "w-full rounded border border-amber-950 bg-amber-50 p-2 text-sm";

export default function AddressPage() {
  const { form, saving, updateField, saveAddress } = useAddressForm();

  async function handleSave(event) {
    event.preventDefault();

    try {
      await saveAddress();
      alert("Address saved");
    } catch (error) {
      alert(error.message || "Failed to save address");
    }
  }

  return (
    <AccountShell>
      <SectionCard className="w-full max-w-lg">
        <h1 className="mb-2 text-2xl font-bold text-amber-950">
          Shipping Address
        </h1>
        <h2 className="mb-2 text-lg font-bold">Addresses</h2>
        <p className="mb-4 text-xs">Add or edit your shipping address below.</p>

        <form onSubmit={handleSave} className="space-y-3">
          <input
            name="country"
            placeholder="Country"
            value={form.country}
            autoComplete="country"
            onChange={updateField}
            className={inputClass}
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            autoComplete="address-level2"
            onChange={updateField}
            className={inputClass}
          />
          <input
            name="postal"
            placeholder="Postal Code"
            value={form.postal}
            autoComplete="postal-code"
            onChange={updateField}
            className={inputClass}
          />
          <input
            name="street"
            placeholder="Street Address"
            value={form.street}
            autoComplete="street-address"
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
