// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import SignupPopup from "./Register";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./Google";
import FetchLoginData from "../../../../api/API_LoginData";

export default function LoginPopup({ open, setOpen, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignup, setOpenSignup] = useState(false);

  const navigate = useNavigate();

  async function handleLogin() {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    if (!password.trim() && email.trim()) {
      alert("Please enter your password");
      return;
    }

    try {
      const givenLoginData = {
        email: email.toLowerCase().trim(),
        password: password.trim(),
      };

      const response = await FetchLoginData(givenLoginData);
      const user = response?.data;

      if (!user?.fullName) {
        alert("Login failed. Please try again.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setOpen(false);
      navigate("/account");
    } catch (error) {
      const message =
        error?.response?.data?.error || "Incorrect email or password";
      alert(message);
    }
  }

  function openSignupFlow() {
    setOpen(false);
    setTimeout(() => setOpenSignup(true), 250);
  }

  function handleGoogleLogin(googleToken) {
    const payload = JSON.parse(atob(googleToken.split(".")[1]));

    const email = payload.email;
    const fullName = payload.name;
    const picture = payload.picture;

    const user = {
      fullName,
      email,
      picture,
      google: true,
    };

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    setOpen(false);
    navigate("/account");
  }

  useEffect(() => {
    function openLogin() {
      setOpen(true);
    }

    document.addEventListener("open-login-popup", openLogin);
    return () => document.removeEventListener("open-login-popup", openLogin);
  }, [setOpen]);

  return (
    <>
      <SignupPopup open={openSignup} setOpen={setOpenSignup} />

      <Dialog open={open} onClose={() => {}} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-amber-950 text-center">
              Welcome Back
            </h2>
            <p className="text-center text-sm text-amber-700 mt-1">
              Sign in to continue your shopping
            </p>

            <div className="mt-6 space-y-4">
              <label htmlFor="login-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                placeholder="Email"
                id="login-email"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="login-password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="login-password"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full mt-6 rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900"
            >
              Sign in
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full mt-4 rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900"
            >
              Back
            </button>

            <GoogleSignIn onLogin={handleGoogleLogin} />

            <p className="mt-4 text-center text-sm text-amber-900">
              Not a member?{" "}
              <span
                onClick={openSignupFlow}
                className="font-semibold text-amber-950 underline cursor-pointer"
              >
                Create account
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}


