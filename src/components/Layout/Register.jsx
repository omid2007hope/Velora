import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function SignupPopup(props) {
  const loadUser = JSON.parse(localStorage.getItem("savedUser"));
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [dataBase, setDataBase] = useState(loadUser || []);

  function Signup() {
    const confirmPassword =
      fullName.trim() && email.trim() && password.trim() === confirmPass.trim();
    if (!confirmPassword) {
      return;
    }
    const userData = {
      fullName: fullName.trim(),
      email: email.trim(),
      password: password.trim(),
    };
    const data = [...dataBase, userData];
    setDataBase(data);
    props.setOpen(false);
  }

  useEffect(() => {
    localStorage.setItem("savedUser", JSON.stringify(dataBase));
  }, [dataBase]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.setOpen}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-2xl bg-orange-50 shadow-2xl sm:my-8 sm:w-full sm:max-w-md"
            >
              <div className="flex flex-col px-8 py-10">
                {/* Brand Icon / Title */}
                <div className="mx-auto flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 border-2 border-amber-950">
                    <svg
                      className="h-7 w-7 text-amber-900"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.5 7h13l-1.5 12h-10L5.5 7zM9 10v-2a3 3 0 016 0v2" />
                    </svg>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-amber-950">
                    Create your account
                  </h2>
                  <p className="mt-1 text-sm text-amber-700">
                    Join us and unlock the latest styles
                  </p>
                </div>

                {/* Form */}
                <form action="#" method="POST" className="mt-8 space-y-5">
                  {/* Full Name */}
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    required
                    className="block w-full rounded-lg border border-amber-950 bg-white px-4 py-3 text-amber-950 placeholder:text-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-600"
                  />

                  {/* Email */}
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    className="block w-full rounded-lg border border-amber-950 bg-white px-4 py-3 text-amber-950 placeholder:text-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-600"
                  />

                  {/* Password */}
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="block w-full rounded-lg border border-amber-950 bg-white px-4 py-3 text-amber-950 placeholder:text-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-600"
                  />

                  {/* Confirm Password */}
                  <input
                    onChange={(e) => setConfirmPass(e.target.value)}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    required
                    className="block w-full rounded-lg border border-amber-950 bg-white px-4 py-3 text-amber-950 placeholder:text-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-600"
                  />

                  {/* Button */}
                  <button
                    type="button"
                    onClick={Signup}
                    className="w-full rounded-full bg-amber-950 px-6 py-3 text-lg font-semibold text-white hover:bg-amber-900 transition"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
