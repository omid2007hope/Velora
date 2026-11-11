/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
