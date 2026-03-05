// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

export default function EmailVerificationPopup({}) {
  return (
    <>
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
              />

              <label htmlFor="login-password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="login-password"
                className="w-full rounded-lg border border-amber-950 px-4 py-3 text-amber-900"
              />
            </div>

            <button className="w-full mt-6 rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900">
              Sign in
            </button>
            <button className="w-full mt-4 rounded-full bg-amber-950 text-white py-3 text-lg font-semibold hover:bg-amber-900">
              Back
            </button>

            <p className="mt-4 text-center text-sm text-amber-900">
              Not a member?{" "}
              <span className="font-semibold text-amber-950 underline cursor-pointer">
                Create account
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
