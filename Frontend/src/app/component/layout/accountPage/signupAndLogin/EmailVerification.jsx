// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { requestEmailVerification } from "../../../../api/API_Recover";

const DEFAULT_MESSAGE =
  "We just emailed you a verification link. Open your inbox, tap the button inside, then come back here to sign in.";

export default function EmailVerificationPopup({ open, setOpen, email = "" }) {
  const [emailInput, setEmailInput] = useState(email);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmailInput(email || "");
    setMessage(DEFAULT_MESSAGE);
  }, [email, open]);

  function openLoginPopup() {
    document.dispatchEvent(new CustomEvent("open-login-popup"));
  }

  function closeAndOpenLogin() {
    setOpen(false);
    openLoginPopup();
  }

  async function handleResend() {
    if (loading) return;

    const normalizedEmail = emailInput.trim().toLowerCase();
    if (!normalizedEmail) {
      setMessage("Enter the email you used to sign up so we can resend the link.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!isValidEmail) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await requestEmailVerification(normalizedEmail);
      setMessage(
        "If an account exists for this email, a fresh verification link is on the way. Check your inbox and spam folder.",
      );
    } catch (error) {
      const reason =
        error?.response?.data?.error ??
        error?.response?.data ??
        error?.message ??
        "Could not resend verification email. Please try again.";
      setMessage(reason);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={closeAndOpenLogin} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-amber-950 text-center">
            Confirm your email
          </h2>
          <p className="mt-1 text-center text-sm text-amber-700" aria-live="polite">
            {message}
          </p>

          <div className="mt-6 space-y-3">
            <label htmlFor="verify-email" className="sr-only">
              Email address
            </label>
            <input
              id="verify-email"
              type="email"
              value={emailInput}
              autoComplete="email"
              onChange={(event) => setEmailInput(event.target.value)}
              placeholder="Email you used to sign up"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
            />
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full rounded-full border border-amber-950 bg-white py-3 text-lg font-semibold text-amber-950 hover:bg-amber-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Resend verification email"}
            </button>
            <button
              onClick={closeAndOpenLogin}
              className="w-full rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900"
            >
              Open login
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
