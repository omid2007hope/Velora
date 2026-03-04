// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import SideBarLayOut from "./AccountLayout";
import FetchCustomerPaymentDetails from "../../../../api/API_Payment";

function PaymentForm() {
  const [payment, setPayment] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();

    setIsSaving(true);
    try {
      const response = await FetchCustomerPaymentDetails(payment);
      const savedPayment = response?.data || {};

      setPayment((prev) => ({
        ...prev,
        name: savedPayment.name || prev.name,
        expiry: savedPayment.expiry || prev.expiry,
        cvv: "",
      }));
      alert("Payment method saved");
    } catch (error) {
      const message =
        error.response?.data?.error || error.response?.data || error.message;
      alert(message || "Failed to save payment method");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="w-full max-w-lg border rounded-md shadow-sm border-[#BCA389] bg-white p-6 text-[#3C1D00]">
      <h2 className="font-bold text-lg mb-2">Payment Methods</h2>
      <p className="text-xs mb-4">
        Add or update your payment details. Your information is stored securely.
      </p>

      <form onSubmit={handleSave} className="space-y-3">
        <input
          name="name"
          placeholder="Cardholder Name"
          value={payment.name}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />
        <input
          name="cardNumber"
          placeholder="Card Number"
          value={payment.cardNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            name="expiry"
            placeholder="MM/YY"
            value={payment.expiry}
            onChange={handleChange}
            className="w-full sm:w-1/2 p-2 border rounded bg-amber-50 text-sm"
          />
          <input
            name="cvv"
            placeholder="CVV"
            value={payment.cvv}
            onChange={handleChange}
            className="w-full sm:w-1/2 p-2 border rounded bg-amber-50 text-sm"
          />
        </div>

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

const WrappedPaymentForm = SideBarLayOut(PaymentForm);

export default WrappedPaymentForm;


