"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignOutForm(props) {
  function signout() {
    localStorage.removeItem("user");
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.setOpen}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg border-2 border-amber-950 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-orange-100 border-b px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-50 border border-amber-950 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-amber-950"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-amber-950"
                    >
                      Sign Out
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-amber-950">
                        Are you sure you want to Sign Out
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={() => signout()}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border-2 border-red-950 bg-red-600 px-3 py-2 text-sm font-semibold text-orange-50 shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  <Link to="/">Sign Out</Link>
                </button>
                <button
                  onClick={() => props.setOpen(false)}
                  type="button"
                  data-autofocus
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-50 px-3 py-2 text-sm font-semibold text-amber-950 shadow-xs inset-ring border-2 inset-ring-gray-300 hover:bg-orange-200 sm:mt-0 sm:w-auto"
                >
                  Stay Log In
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
