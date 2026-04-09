"use client";

import { useState } from "react";
import SiteShell from "@/app/components/layout/SiteShell";
import CartStep from "@/app/features/order/components/CartStep";
import CheckoutStep from "@/app/features/order/components/CheckoutStep";

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [cartSnapshot, setCartSnapshot] = useState([]);

  return (
    <SiteShell>
      {step === 1 ? (
        <CartStep
          onContinue={(items) => {
            setCartSnapshot(items);
            setStep(2);
          }}
        />
      ) : (
        <CheckoutStep
          cartItems={cartSnapshot}
          onBack={() => setStep(1)}
          onComplete={() => setStep(1)}
        />
      )}
    </SiteShell>
  );
}
