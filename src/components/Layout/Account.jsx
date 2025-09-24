// src/pages/AccountSettings.jsx
import React, { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-50 shadow-md hidden md:flex flex-col border-r-1 border-amber-950 shadow-md shadow-amber-950 ">
        <div className="flex flex-col items-center py-6 rounded-md border-amber-950">
          <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center border-1 border-amber-950 ">
            <UserIcon className="h-8 w-8 text-amber-950 " />
          </div>
          <h2 className="mt-2 font-semibold text-amber-950">Omid Teimory</h2>
          <p className="text-sm text-amber-950">$38.00 Balance</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 \">
          {[
            "My Wallet",
            "My Orders",
            "Personal Information",
            "Addresses",
            "Payment Methods",
          ].map((item) => (
            <button
              key={item}
              className={`w-full text-left px-3 py-2 rounded-md text-amber-950 hover:text-white hover:bg-amber-950 transition border-b-2 border-l-2 mt-2.5 border-amber-950 shadow-md shadow-amber-950 ${
                item === "Personal Information"
                  ? "bg-amber-950 text-white font-semibold"
                  : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4">
          <button className="w-full text-left text-amber-800 hover:underline">
            <Link to="/">Back</Link>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white border-1 border-amber-950 rounded-xl shadow p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-amber-950 mb-2">
            Personal Information
          </h1>
          <p className="text-sm text-amber-800 mb-6">
            Update your account details below. This info is used for purchases
            and shipping.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-amber-300 bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-amber-300 bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-amber-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-amber-300 bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
                placeholder="you@example.com"
              />
            </div>

            {/* Phone & DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-amber-300 bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
                  placeholder="+43 123 456 789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-amber-300 bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
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
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-700 border-amber-400 focus:ring-amber-600"
                  />
                  <span className="text-amber-900">Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-700 border-amber-400 focus:ring-amber-600"
                  />
                  <span className="text-amber-900">Female</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-950 text-orange-50 rounded-md shadow hover:bg-amber-900 transition"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-orange-100 text-amber-900 rounded-md shadow hover:bg-amber-950 hover:text-orange-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
