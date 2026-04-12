// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import { requestPasswordReset } from "@/app/features/auth/services/auth-service";
import {
  AUTH_VIEW,
  openAuthPopup,
} from "@/app/features/auth/utils/auth-popup-events";
import {
  getPasswordCriteriaState,
  isValidEmail,
  PASSWORD_CRITERIA,
} from "@/app/features/auth/utils/auth-form-utils";

export default function ResetPasswordPopup({
  open,
  setOpen,
  authView = AUTH_VIEW.CUSTOMER,
}) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordCriteria = useMemo(
    () => getPasswordCriteriaState(newPassword),
    [newPassword],
  );

  useEffect(() => {
    if (!open) return;

    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setStatus("");
  }, [open]);

  function close() {
    setOpen(false);
  }

  function closeAndOpenLogin() {
    setOpen(false);
    openAuthPopup(authView);
  }

  function validateForm() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return "Please enter the email tied to your account.";
    }

    if (!isValidEmail(normalizedEmail)) {
      return "Please enter a valid email address.";
    }

    if (!Object.values(passwordCriteria).every(Boolean)) {
      return "Your new password must meet all strength requirements.";
    }

    if (newPassword !== confirmPassword) {
      return "New password fields must match.";
    }

    return null;
  }

  async function sendResetLink() {
    if (loading) return;

    const errorMessage = validateForm();
    if (errorMessage) {
      setStatus(errorMessage);
      return;
    }

    try {
      setLoading(true);
      setStatus("");
      await requestPasswordReset(
        email.trim().toLowerCase(),
        newPassword,
        authView,
      );
      setStatus(
        "If an account exists for this email, you will receive a password reset link shortly. Use the link to apply your new password.",
      );
    } catch (error) {
      const message =
        error?.response?.data?.error ??
        error?.response?.data ??
        error?.message ??
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
        <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 p-8 shadow-2xl">
          <h2 className="text-center text-2xl font-bold text-amber-950">
            Reset your password
          </h2>
          <p className="mt-1 text-center text-sm text-amber-700">
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
              autoComplete="email"
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
              autoComplete="new-password"
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="New password"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
            />
            <div className="space-y-1 text-sm text-amber-700">
              {PASSWORD_CRITERIA.map((item) => {
                const met = passwordCriteria[item.key];
                return (
                  <div key={item.key} className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold ${met ? "text-emerald-500" : "text-amber-500"}`}
                    >
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
              autoComplete="new-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
            />
          </div>

          {status ? (
            <p
              className="mt-4 rounded-md border border-amber-950/40 bg-white/80 p-3 text-sm text-amber-900"
              aria-live="polite"
            >
              {status}
            </p>
          ) : null}

          <div className="mt-6 space-y-3">
            <button
              onClick={sendResetLink}
              disabled={loading}
              className="w-full rounded-full bg-amber-950 py-3 text-lg font-semibold text-white hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <button
              onClick={closeAndOpenLogin}
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
