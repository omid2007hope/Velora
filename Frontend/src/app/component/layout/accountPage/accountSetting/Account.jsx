// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

// src/pages/AccountSettings.jsx
import React, { useState } from "react";
import Link from "next/link";
import SideBarLayOut from "./AccountLayout";
import updateCustomerDetails from "../../../../api/API_Account";

function AccountSettings() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) =>
    setUser((prev) => ({ ...prev, [field]: event.target.value }));

  async function handleSave() {
    if (loading) return;

    const normalizedEmail = user.email.trim().toLowerCase();
    if (!normalizedEmail) {
      alert("Email is required.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!emailValid) {
      alert("Please enter a valid email.");
      return;
    }

    const fullName = [user.firstName, user.lastName]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(" ");

    const formatted = {
      fullName,
      email: normalizedEmail,
      phoneNumber: user.phoneNumber?.trim(),
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    };

    try {
      setLoading(true);

      const response = await updateCustomerDetails(formatted);
      const savedData = response?.data ?? formatted;
      const fullNameParts = savedData.fullName?.trim().split(/\s+/) ?? [];
      const nextFirstName =
        fullNameParts.length > 1
          ? fullNameParts.slice(0, -1).join(" ")
          : fullNameParts[0] || "";
      const nextLastName =
        fullNameParts.length > 1 ? fullNameParts.at(-1) || "" : "";

      setUser((prev) => ({
        ...prev,
        firstName: nextFirstName || prev.firstName,
        lastName: nextLastName,
        email: savedData.email || formatted.email,
        phoneNumber: savedData.phoneNumber || prev.phoneNumber,
        dateOfBirth: savedData.dateOfBirth || prev.dateOfBirth,
        gender: savedData.gender || prev.gender,
      }));

      alert("Account updated");
    } catch (error) {
      alert("Could not update account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl bg-white border border-amber-950 rounded-xl shadow p-6 text-[#3C1D00]">
      <h1 className="text-2xl font-bold text-amber-950 mb-2">
        Personal Information
      </h1>

      <p className="text-sm text-amber-800 mb-6">
        Update your account details below. This info is used for purchases and
        shipping.
      </p>

      <form className="space-y-4">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900">
              First Name
            </label>
            <input
              value={user.firstName}
              onChange={handleChange("firstName")}
              type="text"
              autoComplete="given-name"
              className="mt-1 w-full rounded-md bg-amber-50 border border-amber-950 text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">
              Last Name
            </label>
            <input
              value={user.lastName}
              onChange={handleChange("lastName")}
              type="text"
              autoComplete="family-name"
              className="mt-1 w-full rounded-md bg-amber-50 border border-amber-950 text-sm p-2"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-amber-900">
            Email
          </label>
          <input
            value={user.email}
            onChange={handleChange("email")}
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-md bg-amber-50 border border-amber-950 text-sm p-2"
          />
        </div>

        {/* Phone + DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900">
              Phone
            </label>
            <input
              value={user.phoneNumber}
              onChange={handleChange("phoneNumber")}
              type="tel"
              autoComplete="tel"
              className="mt-1 w-full rounded-md bg-amber-50 border border-amber-950 text-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900">
              Date of Birth
            </label>
            <input
              value={user.dateOfBirth}
              onChange={handleChange("dateOfBirth")}
              type="date"
              autoComplete="bday"
              className="mt-1 w-full rounded-md bg-amber-50 border border-amber-950 text-sm p-2"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-amber-900">
            Gender
          </label>
          <div className="mt-2 flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                checked={user.gender === "male"}
                onChange={handleChange("gender")}
                value="male"
                type="radio"
                name="gender"
                className="h-4 w-4 text-amber-800 border-amber-600"
              />
              <span className="text-amber-900 text-sm">Male</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                checked={user.gender === "female"}
                onChange={handleChange("gender")}
                value="female"
                type="radio"
                name="gender"
                className="h-4 w-4 text-amber-800 border-amber-600"
              />
              <span className="text-amber-900 text-sm">Female</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-amber-950 text-orange-50 rounded-md shadow text-sm hover:bg-amber-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <Link
            href="/"
            className="px-4 py-2 bg-orange-100 text-amber-900 rounded-md shadow text-sm hover:bg-amber-950 hover:text-orange-50 transition"
          >
            Continue to Shop
          </Link>
        </div>
      </form>
    </div>
  );
}

// Wrap component with Sidebar Layout
const WrappedAccountSettings = SideBarLayOut(AccountSettings);

// Export wrapped component
export default WrappedAccountSettings;


