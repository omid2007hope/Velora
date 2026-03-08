"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import SignupPopup from "./Register";
import { useRouter } from "next/navigation";
import GoogleSignIn from "./Google";
import FetchLoginData from "../../../../api/API_LoginData";
import ResetPasswordPopup from "./RestPassword";
import { saveAuthSession, saveStoredUser } from "@/lib/browser-storage";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export default function LoginPopup({ open, setOpen, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignup, setOpenSignup] = useState(false);
  const [openRestPassword, setOpenRestPassword] = useState(false);

  const router = useRouter();

  const handleChange = (setter) => (event) => setter(event.target.value);

  const validateLogin = () => {
    if (!email.trim()) return "Please enter your email";
    if (!password.trim()) return "Please enter your password";
    return null;
  };

  const switchPopup = (setNext) => {
    setOpen(false);
    setTimeout(() => setNext(true), 250);
  };

  async function handleLogin() {
    const errorMessage = validateLogin();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const givenLoginData = {
        email: email.toLowerCase().trim(),
        password: password.trim(),
      };

      const response = await FetchLoginData(givenLoginData);
      const user = response?.data;

      if (!user?.fullName || !response?.token) {
        alert("Login failed. Please try again.");
        return;
      }

      saveAuthSession({
        user,
        token: response.token,
        refreshToken: response.refreshToken,
      });
      setUser(user);
      setOpen(false);
      router.push("/account");
    } catch (error) {
      const message =
        error?.response?.data?.error ??
        error?.response?.data ??
        "Incorrect email or password";
      alert(message);
    }
  }

  const openSignupPopup = () => switchPopup(setOpenSignup);

  const openResetPasswordPopup = () => switchPopup(setOpenRestPassword);

  function handleGoogleLogin(googleToken) {
    const payload = parseJwt(googleToken);
    if (!payload) {
      alert("Google login failed. Please try again.");
      return;
    }

    const email = payload.email;
    const fullName = payload.name;
    const picture = payload.picture;

    const user = {
      fullName,
      email,
      picture,
      google: true,
    };

    saveStoredUser(user);
    setUser(user);

    setOpen(false);
    router.push("/account");
  }

  useEffect(() => {
    const openLogin = () => setOpen(true);

    document.addEventListener("open-login-popup", openLogin);
    return () => document.removeEventListener("open-login-popup", openLogin);
  }, [setOpen]);

  return (
    <>
      <SignupPopup open={openSignup} setOpen={setOpenSignup} />

      <ResetPasswordPopup
        open={openRestPassword}
        setOpen={setOpenRestPassword}
      />

      <Dialog open={open} onClose={setOpen} className="relative z-50">
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
                autoComplete="email"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={handleChange(setEmail)}
              />

              <label htmlFor="login-password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="login-password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={handleChange(setPassword)}
              />
              <p className="ml-1.5 text-left text-sm text-amber-900">
                Forgot your password ?
                <span
                  className="font-semibold text-amber-950 underline cursor-pointer ml-1"
                  onClick={openResetPasswordPopup}
                >
                  Rest password
                </span>
              </p>
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
              Not a member ?{" "}
              <span
                onClick={openSignupPopup}
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
