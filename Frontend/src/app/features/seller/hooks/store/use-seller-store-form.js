"use client";

import { useState } from "react";

import { createAnStore } from "@/app/features/seller/services/seller-store-service";
import { createSellerStorePayload } from "@/app/features/seller/utils/create-seller-store-payload";

const initialForm = {
  storeName: "",
  storeDescription: "",
  storeZipcode: "",
  cityStoreLocatedIn: "",
  stateOrProvinceStoreLocatedIn: "",
  countryStoreLocatedIn: "",
};

export function useSellerStoreForm() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setSuccessMessage("Product published to your seller catalog.");
    } catch (requestError) {
      const details = requestError?.response?.data?.details;
      const message = Array.isArray(details)
        ? details.map((entry) => `${entry.path}: ${entry.message}`).join(", ")
        : requestError?.response?.data?.error ||
          requestError?.message ||
          "Could not publish product.";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return {
    form,
    saving,
    error,
    successMessage,
    updateField,
    handleSubmit,
  };
}
