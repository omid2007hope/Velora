import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState, useEffect } from "react";
import GoogleSignIn from "./GoogleSignIn";

export default function SignupPopup({ open, setOpen }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [db, setDb] = useState(
    JSON.parse(localStorage.getItem("savedUser")) || []
  );

  function Signup() {
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

    const already = db.some((u) => u.email === email.trim());
    if (already) {
      alert("An account with this email already exists. Please sign in.");
      return;
    }

    const newUser = {
      fullName: fullName.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    const newDB = [...db, newUser];
    setDb(newDB);

    // Close signup popup
    setOpen(false);

    // Automatically open login popup
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent("open-login-popup"));
    }, 200);
  }

  function handleGoogleSignup(token) {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const fullName = payload.name;
    const email = payload.email;
    const picture = payload.picture;

    let db = JSON.parse(localStorage.getItem("savedUser")) || [];

    const exists = db.find((u) => u.email === email);

    // If already registered → show login popup instead
    if (exists) {
      setOpen(false);
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent("open-login-popup"));
      }, 200);
      return;
    }

    const newUser = {
      fullName,
      email,
      password: null,
      picture,
      google: true,
    };

    db.push(newUser);
    localStorage.setItem("savedUser", JSON.stringify(db));

    setOpen(false);

    // After signup, automatically open login popup
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent("open-login-popup"));
    }, 200);
  }

  useEffect(() => {
    localStorage.setItem("savedUser", JSON.stringify(db));
  }, [db]);

  function goBack() {
    setOpen(false);
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent("open-login-popup"));
    }, 200);
  }

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-orange-50 shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-amber-950 text-center">
            Create Your Account
          </h2>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm password"
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
  );
}
