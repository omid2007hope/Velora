// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useMemo, useState } from "react";
import GoogleSignIn from "./Google";
import { registerCustomer } from "@/features/auth/services/auth-service";
import {
  getPasswordCriteriaState,
  parseJwtPayload,
  PASSWORD_CRITERIA,
} from "@/features/auth/utils/auth-form-utils";
import EmailVerificationPopup from "./EmailVerification";

export default function SignupPopup({ open, setOpen }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [openEmailVerificationPopup, setOpenEmailVerificationPopup] =
    useState(false);

  const passwordCriteria = useMemo(() => {
    return getPasswordCriteriaState(password);
  }, [password]);

  const handleChange = (setter) => (event) => setter(event.target.value);

  const openVerification = () => {
    setTimeout(() => setOpenEmailVerificationPopup(true), 200);
  };

  const validateForm = () => {
    if (!fullName.trim()) return "Please enter your full name";
    if (!email.trim()) return "Please enter your email";
    if (!password.trim()) return "Please enter your password";
    if (!confirmPass.trim()) return "Please confirm your password";
    if (password !== confirmPass) return "Passwords do not match";

    if (!Object.values(passwordCriteria).every(Boolean)) {
      return "Password must contain uppercase, lowercase, number, symbol and be at least 8 characters.";
    }

    return null;
  };

  async function handleSignup() {
    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const newUser = {
      fullName: fullName.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    // console.log("newUser:", newUser);

    try {
      await registerCustomer(newUser);
    } catch (error) {
      console.error("Signup request failed:", error.response?.data ?? error.message ?? error);
      const details = error.response?.data?.details;
      const fallback = error.response?.data?.error || error.response?.data || error.message;
      const message = details
        ? details.map((entry) => `${entry.path || "field"}: ${entry.message}`).join("\n")
        : fallback;
      alert(message || "Signup failed. Please try again.");
      return;
    }

    setOpen(false);
    openVerification();
  }

  function handleGoogleSignup(token) {
    const payload = parseJwtPayload(token);
    console.log("Google signup requested for:", payload?.email);

    setOpen(false);
    openVerification();
  }

  function goBack() {
    setOpen(false);
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent("open-login-popup"));
    }, 200);
  }

  return (
    <>
      <EmailVerificationPopup
        open={openEmailVerificationPopup}
        setOpen={setOpenEmailVerificationPopup}
        email={email}
      />

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-amber-950 text-center">
              Create Your Account
            </h2>

            <div className="mt-6 space-y-4">
              <label htmlFor="signup-fullname" className="sr-only">
                Full name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                id="signup-fullname"
                autoComplete="name"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={handleChange(setFullName)}
              />

              <label htmlFor="signup-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                placeholder="Email address"
                id="signup-email"
                autoComplete="email"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={handleChange(setEmail)}
              />

              <label htmlFor="signup-password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="signup-password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={handleChange(setPassword)}
              />
              <div className="mt-2 space-y-1 text-sm text-amber-700">
                {PASSWORD_CRITERIA.map((item) => {
                  const met = passwordCriteria[item.key];
                  return (
                    <div key={item.key} className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold ${
                          met ? "text-emerald-500" : "text-amber-500"
                        }`}
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

              <label htmlFor="signup-confirm" className="sr-only">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                id="signup-confirm"
                autoComplete="new-password"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={handleChange(setConfirmPass)}
              />
            </div>

            <button
              onClick={handleSignup}
              className="w-full mt-6 rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900"
            >
              Sign up
            </button>

            <button
              onClick={goBack}
              className="w-full mt-4 rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900"
            >
              Back
            </button>
            <GoogleSignIn onLogin={handleGoogleSignup} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
