"use client";

import { useState } from "react";
import Link from "next/link";
import updateCustomerPayment from "../../../../api/API_Payment";
import AccountShell from "@/components/account/AccountShell";

const inputClass =
  "w-full rounded border border-amber-950 bg-amber-50 p-2 text-sm";

function PaymentForm() {
  const [payment, setPayment] = useState({
    billingName: "",
    paymentMethodId: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleChange({ target }) {
    const { name, value } = target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (isSaving) return;

    const payload = {
      billingName: payment.billingName.trim(),
      paymentMethodId: payment.paymentMethodId.trim(),
    };

    if (!payload.billingName || !payload.paymentMethodId) {
      alert("Please complete all payment fields.");
      return;
    }

    if (!payload.paymentMethodId.startsWith("pm_")) {
      alert("Invalid Stripe payment method ID.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await updateCustomerPayment(payload);
      const savedPayment = response?.data ?? payload;

      setPayment((prev) => ({
        ...prev,
        billingName: savedPayment.billingName || prev.billingName,
        paymentMethodId: savedPayment.paymentMethodId || prev.paymentMethodId,
      }));
      alert("Payment method saved");
    } catch (error) {
      const message =
        error?.response?.data?.error ??
        error?.response?.data ??
        error?.message;
      alert(message || "Failed to save payment method");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AccountShell>
      <div className="w-full max-w-lg rounded-md border border-[#BCA389] bg-white p-6 text-[#3C1D00] shadow-sm">
        <h2 className="mb-2 text-lg font-bold">Payment Methods</h2>
        <p className="mb-4 text-xs">
          Add or update your payment details. Your information is stored
          securely.
        </p>

        <form onSubmit={handleSave} className="space-y-3">
        <input
          name="billingName"
          placeholder="Billing Name"
          value={payment.billingName}
          autoComplete="cc-name"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="paymentMethodId"
          placeholder="Stripe payment method ID (pm_...)"
          value={payment.paymentMethodId}
          onChange={handleChange}
          className={inputClass}
        />

          <div className="mt-6 flex flex-wrap gap-3">
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
    </AccountShell>
  );
}

export default PaymentForm;


