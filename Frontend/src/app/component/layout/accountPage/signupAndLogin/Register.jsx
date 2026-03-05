// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import GoogleSignIn from "./Google";
import FetchCustomerData from "../../../../api/API_Register";
import EmailVerificationPopup from "./EmailVerification";

export default function SignupPopup({ open, setOpen }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [openEmailVerificationPopup, setOpenEmailVerificationPopup] =
    useState(false);

  async function Signup() {
    if (!fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (fullName.trim() && !email.trim()) {
      alert("Please enter your email");
      return;
    }
    if (email.trim() && !password.trim()) {
      alert("Please enter your password");
      return;
    }
    if (password.trim() && !confirmPass.trim()) {
      alert("Please confirm you password");
      return;
    }
    if (password.trim() !== confirmPass.trim()) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      fullName: fullName.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    // console.log("newUser:", newUser);

    try {
      await FetchCustomerData(newUser);
    } catch (error) {
      alert("Signup failed. Please try again.");
      return;
    }

    // Close signup popup
    setOpen(false);

    // Automatically open email verification popup
    setTimeout(() => {
      setOpenEmailVerificationPopup(true);
    }, 200);
  }

  function handleGoogleSignup(token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Google signup requested for:", payload.email);

    setOpen(false);

    // After signup, automatically open email verification popup
    setTimeout(() => {
      setOpenEmailVerificationPopup(true);
    }, 200);
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
      />

      <Dialog open={open} onClose={() => {}} className="relative z-50">
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
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={(e) => setFullName(e.target.value)}
              />

              <label htmlFor="signup-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                placeholder="Email address"
                id="signup-email"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="signup-password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="signup-password"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="signup-confirm" className="sr-only">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                id="signup-confirm"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            <button
              onClick={Signup}
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
