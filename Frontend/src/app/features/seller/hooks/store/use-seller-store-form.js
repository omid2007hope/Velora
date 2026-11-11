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

import { createAnStore } from "@/app/features/seller/services/seller-store-service";
import { createSellerStorePayload } from "@/app/features/seller/utils/create-seller-store-payload";
import { useSellerNav } from "@/app/features/seller/constants/SellerNavContext";

const initialForm = {
  storeName: "",
  storeDescription: "",
  storeAddress: "",
  storeZipcode: "",
  cityStoreLocatedIn: "",
  stateOrProvinceStoreLocatedIn: "",
  countryStoreLocatedIn: "",
};

export function useSellerStoreForm() {
  const { refreshNav } = useSellerNav();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = createSellerStorePayload(form);
      await createAnStore(payload);
      setForm(initialForm);
      setSuccessMessage("Store created successfully.");
      await refreshNav();
      setPopupVisible(true); // Show popup after successful creation
    } catch (requestError) {
      const details = requestError?.response?.data?.details;
      const message = Array.isArray(details)
        ? details.map((entry) => `${entry.path}: ${entry.message}`).join(", ")
        : requestError?.response?.data?.error ||
          requestError?.message ||
          "Could not create store.";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const closePopup = () => setPopupVisible(false);

  return {
    form,
    saving,
    error,
    successMessage,
    isPopupVisible,
    updateField,
    handleSubmit,
    closePopup,
  };
}
