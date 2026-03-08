// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { useState } from "react";
import Link from "next/link";
import SideBarLayOut from "./AccountLayout";
import updateCustomerAddress from "../../../../api/API_Address";

const inputClass =
  "w-full rounded border border-amber-950 bg-amber-50 p-2 text-sm";

function AddressForm() {
  const [address, setAddress] = useState({
    country: "",
    city: "",
    postal: "",
    street: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleChange({ target }) {
    const { name, value } = target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (isSaving) return;

    if (
      !address.country.trim() ||
      !address.city.trim() ||
      !address.street.trim() ||
      !address.postal.trim()
    ) {
      alert("Please complete all address fields.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        country: address.country.trim(),
        city: address.city.trim(),
        street: address.street.trim(),
        postalCode: address.postal.trim(),
      };
      const response = await updateCustomerAddress(payload);
      const savedAddress = response?.data ?? payload;

      setAddress({
        country: savedAddress.country || "",
        city: savedAddress.city || "",
        postal: savedAddress.postalCode || "",
        street: savedAddress.street || "",
      });
      alert("Address saved");
    } catch (error) {
      const message =
        error?.response?.data?.error ??
        error?.response?.data ??
        error?.message;
      alert(message || "Failed to save address");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="w-full max-w-lg border rounded-md shadow-sm border-[#BCA389] bg-white p-6 text-[#3C1D00]">
      <h2 className="font-bold text-lg mb-2">Addresses</h2>
      <p className="text-xs mb-4">Add or edit your shipping address below.</p>

      <form onSubmit={handleSave} className="space-y-3">
        <input
          name="country"
          placeholder="Country"
          value={address.country}
          autoComplete="country"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="city"
          placeholder="City"
          value={address.city}
          autoComplete="address-level2"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="postal"
          placeholder="Postal Code"
          value={address.postal}
          autoComplete="postal-code"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="street"
          placeholder="Street Address"
          value={address.street}
          autoComplete="street-address"
          onChange={handleChange}
          className={inputClass}
        />

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#5B2C00] text-white py-2 px-4 rounded text-sm hover:bg-amber-900"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>

          <Link
            href="/"
            className="rounded-md bg-orange-100 px-4 py-2 text-sm text-amber-900 shadow transition hover:bg-amber-950 hover:text-orange-50"
          >
            Continue to shop
          </Link>
        </div>
      </form>
    </div>
  );
}

const WrappedAddressForm = SideBarLayOut(AddressForm);

export default WrappedAddressForm;


