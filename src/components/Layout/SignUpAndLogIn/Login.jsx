import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import SignupPopup from "./Register";
import { useNavigate } from "react-router-dom";

export default function LoginPopup({ open, setOpen, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignup, setOpenSignup] = useState(false);

  const navigate = useNavigate();

  function Login() {
    const saved = JSON.parse(localStorage.getItem("savedUser")) || [];

    const match = saved.find(
      (x) => x.email === email.trim() && x.password === password.trim()
    );

    if (!match) return;

    localStorage.setItem("user", JSON.stringify(match));
    setUser(match);

    // Close login popup
    setOpen(false);

    navigate("/AccountPage");
  }

  function openSignupFlow() {
    // Close Login → Open Signup
    setOpen(false);
    setTimeout(() => setOpenSignup(true), 250);
  }

  return (
    <>
      <SignupPopup open={openSignup} setOpen={setOpenSignup} />

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

            {/* Inputs */}
            <div className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              onClick={Login}
              className="w-full mt-6 rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900"
            >
              Sign in
            </button>

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
