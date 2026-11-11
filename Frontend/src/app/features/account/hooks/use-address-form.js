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
