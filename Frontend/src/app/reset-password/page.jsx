// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset } from "@/features/auth/services/auth-service";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("pending"); // pending | success | error
  const [message, setMessage] = useState("Applying your new password...");

  useEffect(() => {
    async function confirm() {
      if (!token) {
        setStatus("error");
        setMessage("No reset token was provided.");
        return;
      }

      try {
        await confirmPasswordReset(token);
        setStatus("success");
        setMessage("Your password was updated successfully. You can sign in with it now.");
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent("open-login-popup"));
        }, 300);
      } catch (error) {
        const reason =
          error?.response?.data?.error ||
          error?.message ||
          "The reset link is invalid or has expired. Please request a new one.";
        setStatus("error");
        setMessage(reason);
      }
    }

    confirm();
  }, [token]);

  function goHome() {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 border border-amber-200">
        <h1 className="text-2xl font-bold text-amber-950 text-center">
          Reset Password
        </h1>
        <p
          className={`mt-4 text-center text-sm ${
            status === "success"
              ? "text-emerald-700"
              : status === "error"
                ? "text-rose-700"
                : "text-amber-800"
          }`}
        >
          {message}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={goHome}
            className="w-full rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordConfirmPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
