// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";

export default function ResetPasswordPopup({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function close() {
    setOpen(false);
  }

  function sendResetLink() {
    if (!email.trim()) {
      alert("Please enter the email address tied to your account.");
      return;
    }

    // TODO: wire to backend /server/customer/password-reset when endpoint exists
    console.info("Simulating reset link send for:", email);
    setStatus(
      "If an account exists for this email, you will receive a password reset link shortly.",
    );
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
          </div>

          {status && (
            <p className="mt-4 rounded-md border border-amber-950/40 bg-white/80 p-3 text-sm text-amber-900">
              {status}
            </p>
          )}

          <div className="mt-6 space-y-3">
            <button
              onClick={sendResetLink}
              className="w-full rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900"
            >
              Send reset link
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
