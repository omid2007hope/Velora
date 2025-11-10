// src/pages/AccountSettings.jsx
import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SignOutForm from "./SignOutForm";

export default function AccountSettings() {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  function getDataFromLocalStorage() {
    const loadUser = JSON.parse(localStorage.getItem("user"));
    if (!loadUser) {
      return;
    }
    const splitFullName = loadUser.fullName.split(" ");
    const firstName = splitFullName[0];
    const lastName = splitFullName[1];
    // console.log(splitFullName);
    setUser({ ...loadUser, firstName, lastName });
  }

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  console.log(user);

  function onChange(name, value) {
    setUser((p) => ({ ...p, [name]: value }));
  }

  return (
    <div className="min-h-screen bg-orange-50 flex">
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

          <form className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900">
                  First Name
                </label>
                <input
                  value={user.firstName}
                  onChange={(x) => onChange("firstName", x.target.value)}
                  type="text"
                  name="firstName"
                  className="mt-1 block w-full rounded-md  bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900">
                  Last Name
                </label>
                <input
                  value={user.lastName}
                  onChange={(x) => onChange("lastName", x.target.value)}
                  type="text"
                  name="lastName"
                  className="mt-1 block w-full rounded-md  bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
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
                onChange={(x) => onChange("email", x.target.value)}
                type="email"
                name="email"
                className="mt-1 block w-full rounded-md  bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
              />
            </div>

            {/* Phone & DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900">
                  Phone
                </label>
                <input
                  value={user.phoneNumber}
                  onChange={(x) => onChange("phoneNumber", x.target.value)}
                  type="tel"
                  name="phone"
                  className="mt-1 block w-full rounded-md  bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900">
                  Date of Birth
                </label>
                <input
                  value={user.dateOfBirth}
                  onChange={(x) => onChange("dateOfBirth", x.target.value)}
                  type="date"
                  name="dob"
                  className="mt-1 block w-full rounded-md  bg-amber-50 focus:ring-amber-600 focus:border-amber-600 sm:text-sm py-2.5 rounder-lg border-1 border-amber-950 pl-2 "
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
                    onChange={(x) => onChange("gender", x.target.value)}
                    checked={user.gender === "male"}
                    type="radio"
                    name="gender"
                    value="male"
                    className="h-4 w-4 text-amber-700 border-amber-400 focus:ring-amber-600"
                  />
                  <span className="text-amber-900">Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    onChange={(x) => onChange("gender", x.target.value)}
                    checked={user.gender === "female"}
                    type="radio"
                    name="gender"
                    value="female"
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
                onClick={() =>
                  localStorage.setItem("user", JSON.stringify(user))
                }
              >
                Save
              </button>
              <Link to="/">
                <button
                  type="button"
                  className="px-4 py-2 bg-orange-100 text-amber-900 rounded-md shadow hover:bg-amber-950 hover:text-orange-50 transition"
                >
                  continue to Shop
                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
