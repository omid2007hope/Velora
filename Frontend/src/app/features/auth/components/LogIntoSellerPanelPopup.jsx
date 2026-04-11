"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  saveAuthSession,
  saveStoredStoreOwner,
} from "@/app/lib/browser-storage";
import GoogleSignIn from "@/app/features/auth/components/GoogleSignIn";
import ResetPasswordPopup from "@/app/features/auth/components/ResetPasswordPopup";
import SellerSignupPopup from "@/app/features/auth/components/SellerSignupPopup";
import { loginStoreOwner } from "@/app/features/auth/services/auth-service";
import { AUTH_VIEW } from "@/app/features/auth/utils/auth-popup-events";
import { parseJwtPayload } from "@/app/features/auth/utils/auth-form-utils";

export default function LogIntoSellerPanelPopup({
  logIntoSellerPanel,
  setLogIntoSellerPanel,
  setStoreOwner,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [openSellerSignup, setOpenSellerSignup] = useState(false);
  const router = useRouter();

  const handleChange = (setter) => (event) => setter(event.target.value);

  function validateLogin() {
    if (!email.trim()) return "Please enter your email";
    if (!password.trim()) return "Please enter your password";
    return null;
  }

  function switchPopup(setNext) {
    setLogIntoSellerPanel(false);
    setTimeout(() => setNext(true), 250);
  }

  function clearStoredCustomerState() {
    window.localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-updated"));
  }

  async function handleLogin() {
    const errorMessage = validateLogin();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const response = await loginStoreOwner({
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });
      const storeOwner = response?.data;

      if (!storeOwner?.fullName || !response?.token) {
        alert("Login failed. Please try again.");
        return;
      }

      clearStoredCustomerState();
      saveAuthSession({
        storeOwner,
        token: response.token,
        refreshToken: response.refreshToken,
      });
      setStoreOwner(storeOwner);
      setLogIntoSellerPanel(false);
      router.push("/");
    } catch (error) {
      const message =
        error?.response?.data?.error ??
        error?.response?.data ??
        "Incorrect email or password";
      alert(message);
    }
  }

  function handleGoogleLogin(googleToken) {
    const payload = parseJwtPayload(googleToken);
    if (!payload) {
      alert("Google login failed. Please try again.");
      return;
    }

    const storeOwner = {
      fullName: payload.name,
      email: payload.email,
      picture: payload.picture,
      google: true,
    };

    clearStoredCustomerState();
    saveStoredStoreOwner(storeOwner);
    setStoreOwner(storeOwner);
    setLogIntoSellerPanel(false);
    router.push("/");
  }

  useEffect(() => {
    const openSellerPanel = () => setLogIntoSellerPanel(true);

    document.addEventListener("open-sellerPanel-popup", openSellerPanel);
    return () =>
      document.removeEventListener("open-sellerPanel-popup", openSellerPanel);
  }, [setLogIntoSellerPanel]);

  return (
    <>
      <SellerSignupPopup
        open={openSellerSignup}
        setOpen={setOpenSellerSignup}
      />

      <ResetPasswordPopup
        open={openResetPassword}
        setOpen={setOpenResetPassword}
        authView={AUTH_VIEW.SELLER}
      />

      <Dialog
        open={logIntoSellerPanel}
        onClose={setLogIntoSellerPanel}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 p-8 shadow-2xl">
            <h2 className="text-center text-2xl font-bold text-amber-950">
              Welcome Back, Seller
            </h2>
            <p className="mt-1 text-center text-sm text-amber-700">
              Sign in to manage your Velora store
            </p>

            <div className="mt-6 space-y-4">
              <label htmlFor="login-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                placeholder="Store owner email"
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
                placeholder="Store owner password"
                id="login-password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={handleChange(setPassword)}
              />
              <p className="ml-1.5 text-left text-sm text-amber-900">
                Forgot your seller password?
                <span
                  className="ml-1 cursor-pointer font-semibold text-amber-950 underline"
                  onClick={() => switchPopup(setOpenResetPassword)}
                >
                  Reset password
                </span>
              </p>
            </div>

            <button
              onClick={handleLogin}
              className="mt-6 w-full rounded-full bg-amber-950 py-3 text-lg font-semibold text-white hover:bg-amber-900"
            >
              Sign in to Seller Panel
            </button>
            <button
              onClick={() => setLogIntoSellerPanel(false)}
              className="mt-4 w-full rounded-full bg-amber-950 py-3 text-lg font-semibold text-white hover:bg-amber-900"
            >
              Back to Store
            </button>

            <GoogleSignIn onLogin={handleGoogleLogin} />

            <p className="mt-4 text-center text-sm text-amber-900">
              Not selling on Velora yet?
              <span
                onClick={() => switchPopup(setOpenSellerSignup)}
                className="cursor-pointer font-semibold text-amber-950 underline"
              >
                Register as a Store owner on Velora
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
