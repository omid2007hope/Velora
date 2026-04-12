"use client";

import { useState } from "react";
import { createSellerProduct } from "@/app/features/seller/services/seller-products-service";
import { createSellerProductPayload } from "@/app/features/seller/utils/create-seller-product-payload";

const initialForm = {
  name: "",
  description: "",
  category: "",
  subCategory: "",
  price: "",
  oldPrice: "",
  newPrice: "",
  imageUrl: "",
};

export function useSellerProductForm() {
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
      const payload = createSellerProductPayload(form);
      await createSellerProduct(payload);
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
