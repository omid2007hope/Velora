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
