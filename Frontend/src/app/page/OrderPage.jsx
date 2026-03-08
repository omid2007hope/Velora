"use client";
import { useState } from "react";
import ShoppingCart from "../component/layout/orderPage/BasketPage";
import Checkout from "../component/layout/orderPage/CheckoutForm";
import SiteShell from "@/components/layout/SiteShell";

function OrderPage() {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState([]);

  return (
    <SiteShell>
      {step === 1 && (
        <ShoppingCart setStep={setStep} setProduct={setProduct} />
      )}

      {step === 2 && <Checkout setStep={setStep} product={product} />}
    </SiteShell>
  );
}

export default OrderPage;


