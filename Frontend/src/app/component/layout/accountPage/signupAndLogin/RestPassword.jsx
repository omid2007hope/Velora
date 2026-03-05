// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useMemo, useState } from "react";
import { requestPasswordReset } from "../../../../api/API_Recover";

export default function ResetPasswordPopup({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function close() {
    setOpen(false);
  }

  const criteriaList = useMemo(
    () => [
      { key: "length", label: "At least 8 characters" },
      { key: "uppercase", label: "One uppercase letter" },
      { key: "lowercase", label: "One lowercase letter" },
      { key: "number", label: "A number" },
      { key: "symbol", label: "A special symbol (!@#$%)" },
    ],
    [],
  );

  const passwordCriteria = useMemo(() => {
    const length = newPassword.length >= 8;
    const uppercase = /[A-Z]/.test(newPassword);
    const lowercase = /[a-z]/.test(newPassword);
    const number = /[0-9]/.test(newPassword);
    const symbol = /[!@#$%^&*(),.?"{}|<>~`_+=:\/\\\[\]-]/.test(newPassword);
    return { length, uppercase, lowercase, number, symbol };
  }, [newPassword]);

  async function sendResetLink() {
    if (!email.trim()) {
      alert("Please enter the email address tied to your account.");
      return;
    }
    if (!Object.values(passwordCriteria).every(Boolean)) {
      alert("Your new password must satisfy all strength requirements before requesting a reset.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Please make sure both new password fields match.");
      return;
    }

    try {
      setLoading(true);
      setStatus("");
      await requestPasswordReset(email, newPassword);
      setStatus(
        "If an account exists for this email, you will receive a password reset link shortly. Use the link to apply your new password.",
      );
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Could not send password reset email. Please try again.";
      setStatus(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-amber-950 text-center">
            Reset your password
          </h2>
          <p className="text-center text-sm text-amber-700 mt-1">
            Enter the email address you used to create your account. We will
            send a secure link that lets you pick a new password without sharing
            your current one.
          </p>

          <div className="mt-6 space-y-4">
            <label htmlFor="reset-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="reset-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
            />

            <label htmlFor="reset-password" className="sr-only">
              New password
            </label>
            <input
              type="password"
              id="reset-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="New password"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
            />
            <div className="space-y-1 text-sm text-amber-700">
              {criteriaList.map((item) => {
                const met = passwordCriteria[item.key];
                return (
                  <div key={item.key} className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${met ? "text-emerald-500" : "text-amber-500"}`}>
                      {met ? "✓" : "○"}
                    </span>
                    <span className={met ? "text-amber-950" : "text-amber-600"}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <label htmlFor="reset-confirm" className="sr-only">
              Confirm new password
            </label>
            <input
              type="password"
              id="reset-confirm"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
            />
          </div>

          {status && (
            <p className="mt-4 rounded-md border border-amber-950/40 bg-white/80 p-3 text-sm text-amber-900">
              {status}
            </p>
          )}

          <div className="mt-6 space-y-3">
            <button
              onClick={sendResetLink}
              disabled={loading}
              className="w-full rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <button
              onClick={close}
              className="w-full rounded-full border border-amber-950 bg-white py-3 text-lg font-semibold text-amber-950 hover:bg-amber-100"
            >
              Back to login
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
