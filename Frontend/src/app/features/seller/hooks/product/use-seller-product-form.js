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
  const [selectedStoreId, setSelectedStoreId] = useState(null);
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
      const payload = createSellerProductPayload(form, selectedStoreId);
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
    selectedStoreId,
    setSelectedStoreId,
    saving,
    error,
    successMessage,
    updateField,
    handleSubmit,
  };
}
