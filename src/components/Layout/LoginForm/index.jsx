import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import LoginStep1 from "./LoginStep1";
import LoginStep2 from "./LoginStep2";

export default function LoginPopup(props) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

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
              className="relative transform overflow-hidden rounded-2xl bg-orange-50 text-left shadow-2xl sm:my-8 sm:w-full sm:max-w-md"
            >
              {step === 1 && (
                <LoginStep1
                  step={step}
                  setStep={setStep}
                  email={email}
                  setEmail={setEmail}
                  {...props}
                />
              )}
              ,
              {step === 2 && (
                <LoginStep2
                  step={step}
                  setStep={setStep}
                  email={email}
                  setEmail={setEmail}
                  {...props}
                />
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
