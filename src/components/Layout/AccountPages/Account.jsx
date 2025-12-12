// src/pages/AccountSettings.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBarLayOut from "./Layout";

function AccountSettings() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;

      const parsed = JSON.parse(raw);

      let firstName = "";
      let lastName = "";

      if (parsed.fullName) {
        const split = parsed.fullName.split(" ");
        firstName = split[0] || "";
        lastName = split.slice(1).join(" ") || "";
      }

      setUser({
        firstName,
        lastName,
        email: parsed.email || "",
        phoneNumber: parsed.phoneNumber || "",
        dateOfBirth: parsed.dateOfBirth || "",
        gender: parsed.gender || "",
      });
    } catch {
      // ignore invalid JSON
    }
  }, []);

  function onChange(name, value) {
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();

    const formatted = {
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    };

    localStorage.setItem("user", JSON.stringify(formatted));
    window.dispatchEvent(new Event("user-updated"));
    alert("Account updated");
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

      <form onSubmit={handleSave} className="space-y-4">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900">
              First Name
            </label>
            <input
              value={user.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              type="text"
              className="mt-1 w-full rounded-md bg-amber-50 border border-amber-950 text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">
              Last Name
            </label>
            <input
              value={user.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              type="text"
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
            onChange={(e) => onChange("email", e.target.value)}
            type="email"
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
              onChange={(e) => onChange("phoneNumber", e.target.value)}
              type="tel"
              className="mt-1 w-full rounded-md bg-amber-50 border border-amber-950 text-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900">
              Date of Birth
            </label>
            <input
              value={user.dateOfBirth}
              onChange={(e) => onChange("dateOfBirth", e.target.value)}
              type="date"
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
                onChange={(e) => onChange("gender", e.target.value)}
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
                onChange={(e) => onChange("gender", e.target.value)}
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
            type="submit"
            className="px-4 py-2 bg-amber-950 text-orange-50 rounded-md shadow text-sm hover:bg-amber-900 transition"
          >
            Save
          </button>

          <Link to="/">
            <button
              type="button"
              className="px-4 py-2 bg-orange-100 text-amber-900 rounded-md shadow text-sm hover:bg-amber-950 hover:text-orange-50 transition"
            >
              Continue to Shop
            </button>
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
