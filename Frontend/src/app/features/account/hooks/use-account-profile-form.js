"use client";

import { useState } from "react";
import { updateAccountDetails } from "@/app/features/account/services/account-service";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
};

export function useAccountProfileForm() {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  function updateField(field) {
    return (event) => {
      setForm((previousForm) => ({
        ...previousForm,
        [field]: event.target.value,
      }));
    };
  }

  async function saveProfile() {
    if (saving) {
      return;
    }

    const normalizedEmail = form.email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error("Email is required.");
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!emailValid) {
      throw new Error("Please enter a valid email.");
    }

    const fullName = [form.firstName, form.lastName]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(" ");

    const payload = {
      fullName,
      email: normalizedEmail,
      phoneNumber: form.phoneNumber?.trim(),
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
    };

    setSaving(true);

    try {
      const response = await updateAccountDetails(payload);
      const savedData = response?.data ?? payload;
      const fullNameParts = savedData.fullName?.trim().split(/\s+/) ?? [];
      const firstName =
        fullNameParts.length > 1
          ? fullNameParts.slice(0, -1).join(" ")
          : fullNameParts[0] || "";
      const lastName = fullNameParts.length > 1 ? fullNameParts.at(-1) || "" : "";

      setForm((previousForm) => ({
        ...previousForm,
        firstName: firstName || previousForm.firstName,
        lastName,
        email: savedData.email || payload.email,
        phoneNumber: savedData.phoneNumber || previousForm.phoneNumber,
        dateOfBirth: savedData.dateOfBirth || previousForm.dateOfBirth,
        gender: savedData.gender || previousForm.gender,
      }));
    } finally {
      setSaving(false);
    }
  }

  return {
    form,
    saving,
    updateField,
    saveProfile,
  };
}
