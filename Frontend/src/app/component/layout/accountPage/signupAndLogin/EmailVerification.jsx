// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function EmailVerificationPopup({ open, setOpen }) {
  function closeAndOpenLogin() {
    setOpen(false);
    document.dispatchEvent(new CustomEvent("open-login-popup"));
  }

  function handleResend() {
    alert("A new verification link has been sent. Please check your inbox (and spam) for the message.");
  }

  return (
    <Dialog open={open} onClose={closeAndOpenLogin} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-amber-950 text-center">
            Confirm your email
          </h2>
          <p className="text-center text-sm text-amber-700 mt-1">
            We just emailed you a verification link. Open your inbox, tap the button inside,
            then come back here to sign in. The link will expire soon, so do it while it is fresh.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleResend}
              className="w-full rounded-full border border-amber-950 bg-white py-3 text-lg font-semibold text-amber-950 hover:bg-amber-100"
            >
              Resend verification email
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
