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
