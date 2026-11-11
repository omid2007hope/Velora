// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
