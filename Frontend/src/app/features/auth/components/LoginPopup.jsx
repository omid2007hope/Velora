"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { saveAuthSession } from "@/app/lib/browser-storage";
import GoogleSignIn from "@/app/features/auth/components/GoogleSignIn";
import ResetPasswordPopup from "@/app/features/auth/components/ResetPasswordPopup";
import SignupPopup from "@/app/features/auth/components/SignupPopup";
import { loginCustomer } from "@/app/features/auth/services/auth-service";
import { AUTH_VIEW } from "@/app/features/auth/utils/auth-popup-events";
import {
  closeLoginPopup,
  setUser,
  setStoreOwner,
} from "@/app/redux/slice/authSlice";
import {
  clearStoreOwnerProfile,
} from "@/app/redux/slice/StoreOwnerSlice";
import { setUserProfile } from "@/app/redux/slice/UserSlice";

export default function LoginPopup() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.auth.loginPopupOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignup, setOpenSignup] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const router = useRouter();

  const handleChange = (setter) => (event) => setter(event.target.value);

  function validateLogin() {
    if (!email.trim()) return "Please enter your email";
    if (!password.trim()) return "Please enter your password";
    return null;
  }

  function close() {
    dispatch(closeLoginPopup());
  }

  function switchPopup(setNext) {
    close();
    setTimeout(() => setNext(true), 250);
  }

  function clearStoredSellerState() {
    dispatch(setStoreOwner(null));
    dispatch(clearStoreOwnerProfile());
  }

  async function handleLogin() {
    const errorMessage = validateLogin();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const response = await loginCustomer({
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });
      const user = response?.data;

      if (!user?.fullName || !response?.token) {
        alert("Login failed. Please try again.");
        return;
      }

      clearStoredSellerState();
      saveAuthSession({
        user,
        token: response.token,
        refreshToken: response.refreshToken,
      });
      dispatch(setUser(user));
      dispatch(setUserProfile(user));
      close();
      router.push("/account");
    } catch (error) {
      const message =
        error?.response?.data?.error ??
        error?.response?.data ??
        "Incorrect email or password";
      alert(message);
    }
  }

  function handleGoogleLogin(_googleToken) {
    alert(
      "Google sign-in is temporarily unavailable until backend token verification is enabled.",
    );
  }

  return (
    <>
      <SignupPopup open={openSignup} setOpen={setOpenSignup} />
      <ResetPasswordPopup
        open={openResetPassword}
        setOpen={setOpenResetPassword}
        authView={AUTH_VIEW.CUSTOMER}
      />

      <Dialog open={open} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 p-8 shadow-2xl">
            <h2 className="text-center text-2xl font-bold text-amber-950">
              Welcome Back
            </h2>
            <p className="mt-1 text-center text-sm text-amber-700">
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
                  className="ml-1 cursor-pointer font-semibold text-amber-950 underline"
                  onClick={() => switchPopup(setOpenResetPassword)}
                >
                  Rest password
                </span>
              </p>
            </div>

            <button
              onClick={handleLogin}
              className="mt-6 w-full rounded-full bg-amber-950 py-3 text-lg font-semibold text-white hover:bg-amber-900"
            >
              Sign in
            </button>
            <button
              onClick={close}
              className="mt-4 w-full rounded-full bg-amber-950 py-3 text-lg font-semibold text-white hover:bg-amber-900"
            >
              Back
            </button>

            <GoogleSignIn onLogin={handleGoogleLogin} />

            <p className="mt-4 text-center text-sm text-amber-900">
              Not a member ?{" "}
              <span
                onClick={() => switchPopup(setOpenSignup)}
                className="cursor-pointer font-semibold text-amber-950 underline"
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
