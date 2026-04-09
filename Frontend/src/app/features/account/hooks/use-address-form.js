"use client";

import { useState } from "react";
import { updateAddressDetails } from "@/app/features/account/services/account-service";

const initialState = {
  country: "",
  city: "",
  postal: "",
  street: "",
};

export function useAddressForm() {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  }

  async function saveAddress() {
    if (saving) {
      return;
    }

    if (
      !form.country.trim() ||
      !form.city.trim() ||
      !form.street.trim() ||
      !form.postal.trim()
    ) {
      throw new Error("Please complete all address fields.");
    }

    const payload = {
      country: form.country.trim(),
      city: form.city.trim(),
      street: form.street.trim(),
      postalCode: form.postal.trim(),
    };

    setSaving(true);

    try {
      const response = await updateAddressDetails(payload);
      const savedAddress = response?.data ?? payload;

      setForm({
        country: savedAddress.country || "",
        city: savedAddress.city || "",
        postal: savedAddress.postalCode || "",
        street: savedAddress.street || "",
      });
    } finally {
      setSaving(false);
    }
  }

  return {
    form,
    saving,
    updateField,
    saveAddress,
  };
}
