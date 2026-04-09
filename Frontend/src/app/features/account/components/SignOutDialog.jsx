"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/app/lib/browser-storage";

export default function SignOutDialog({ open, setOpen }) {
  const router = useRouter();

  function signOut() {
    clearAuthSession();
    setOpen(false);
    router.push("/");
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg border-2 border-amber-950 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="border-b bg-orange-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full border border-amber-950 bg-orange-50 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-amber-950"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-amber-950"
                  >
                    Sign Out
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-amber-950">
                      Are you sure you want to sign out?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={signOut}
                type="button"
                className="inline-flex w-full justify-center rounded-md border-2 border-red-950 bg-red-600 px-3 py-2 text-sm font-semibold text-orange-50 hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Sign Out
              </button>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border-2 bg-orange-50 px-3 py-2 text-sm font-semibold text-amber-950 hover:bg-orange-200 sm:mt-0 sm:w-auto"
              >
                Stay Logged In
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
