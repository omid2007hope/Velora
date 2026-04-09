"use client";

import Link from "next/link";
import AccountShell from "@/app/components/account/AccountShell";
import SectionCard from "@/app/components/ui/SectionCard";
import { useAccountProfileForm } from "@/app/features/account/hooks/use-account-profile-form";

export default function AccountProfilePage() {
  const { form, saving, updateField, saveProfile } = useAccountProfileForm();

  async function handleSave() {
    try {
      await saveProfile();
      alert("Account updated");
    } catch (error) {
      alert(error.message || "Could not update account. Please try again.");
    }
  }

  return (
    <AccountShell>
      <SectionCard className="w-full max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-amber-950">
          Personal Information
        </h1>
        <p className="mb-6 text-sm text-amber-800">
          Update your account details below. This info is used for purchases and
          shipping.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-amber-900">
                First Name
              </label>
              <input
                value={form.firstName}
                onChange={updateField("firstName")}
                type="text"
                autoComplete="given-name"
                className="mt-1 w-full rounded-md border border-amber-950 bg-amber-50 p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900">
                Last Name
              </label>
              <input
                value={form.lastName}
                onChange={updateField("lastName")}
                type="text"
                autoComplete="family-name"
                className="mt-1 w-full rounded-md border border-amber-950 bg-amber-50 p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900">Email</label>
            <input
              value={form.email}
              onChange={updateField("email")}
              type="email"
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-amber-950 bg-amber-50 p-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-amber-900">
                Phone
              </label>
              <input
                value={form.phoneNumber}
                onChange={updateField("phoneNumber")}
                type="tel"
                autoComplete="tel"
                className="mt-1 w-full rounded-md border border-amber-950 bg-amber-50 p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900">
                Date of Birth
              </label>
              <input
                value={form.dateOfBirth}
                onChange={updateField("dateOfBirth")}
                type="date"
                autoComplete="bday"
                className="mt-1 w-full rounded-md border border-amber-950 bg-amber-50 p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900">
              Gender
            </label>
            <div className="mt-2 flex space-x-6">
              {["male", "female"].map((value) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    checked={form.gender === value}
                    onChange={updateField("gender")}
                    value={value}
                    type="radio"
                    name="gender"
                    className="h-4 w-4 border-amber-600 text-amber-800"
                  />
                  <span className="text-sm capitalize text-amber-900">{value}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-md bg-amber-950 px-4 py-2 text-sm text-orange-50 shadow transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <Link
              href="/"
              className="rounded-md bg-orange-100 px-4 py-2 text-sm text-amber-900 shadow transition hover:bg-amber-950 hover:text-orange-50"
            >
              Continue to Shop
            </Link>
          </div>
        </form>
      </SectionCard>
    </AccountShell>
  );
}
