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
