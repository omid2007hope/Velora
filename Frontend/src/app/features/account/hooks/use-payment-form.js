"use client";

import { useState } from "react";
import { updatePaymentDetails } from "@/app/features/account/services/account-service";

const initialState = {
  billingName: "",
  paymentMethodId: "",
};

export function usePaymentForm() {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  }

  async function savePaymentMethod() {
    if (saving) {
      return;
    }

    const payload = {
      billingName: form.billingName.trim(),
      paymentMethodId: form.paymentMethodId.trim(),
    };

    if (!payload.billingName || !payload.paymentMethodId) {
      throw new Error("Please complete all payment fields.");
    }

    if (!payload.paymentMethodId.startsWith("pm_")) {
      throw new Error("Invalid Stripe payment method ID.");
    }

    setSaving(true);

    try {
      const response = await updatePaymentDetails(payload);
      const savedPayment = response?.data ?? payload;

      setForm((previousForm) => ({
        ...previousForm,
        billingName: savedPayment.billingName || previousForm.billingName,
        paymentMethodId:
          savedPayment.paymentMethodId || previousForm.paymentMethodId,
      }));
    } finally {
      setSaving(false);
    }
  }

  return {
    form,
    saving,
    updateField,
    savePaymentMethod,
  };
}
