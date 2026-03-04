"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import SideBarLayOut from "./AccountLayout";
import FetchCustomerAddress from "../../../../api/API_Address";

function AddressForm() {
  const [address, setAddress] = useState({
    country: "",
    city: "",
    postal: "",
    street: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();

    setIsSaving(true);
    try {
      const payload = {
        country: address.country,
        city: address.city,
        street: address.street,
        postalCode: address.postal,
      };
      const response = await FetchCustomerAddress(payload);
      const savedAddress = response?.data || payload;

      setAddress({
        country: savedAddress.country || "",
        city: savedAddress.city || "",
        postal: savedAddress.postalCode || "",
        street: savedAddress.street || "",
      });
      alert("Address saved");
    } catch (error) {
      const message =
        error.response?.data?.error || error.response?.data || error.message;
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
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />
        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />
        <input
          name="postal"
          placeholder="Postal Code"
          value={address.postal}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />
        <input
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#5B2C00] text-white py-2 px-4 rounded text-sm hover:bg-amber-900"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>

          <Link to="/">
            <button
              type="button"
              className="py-2 px-4 bg-orange-100 text-amber-900 rounded-md shadow text-sm hover:bg-amber-950 hover:text-orange-50 transition"
            >
              Continue to shop
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const WrappedAddressForm = SideBarLayOut(AddressForm);

export default WrappedAddressForm;
