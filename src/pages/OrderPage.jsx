import { useState } from "react";
import ShoppingCart from "../components/Order/ShoppingCart";
import Checkout from "../components/Order/Checkout";
import WithMenuLayout from "../components/Layout/Index";
import { Seo } from "../utils/seo";

function OrderPage() {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState([]);

  return (
    <>
      <Seo
        title="Your Cart | Velora"
        description="Review your Velora items, update quantities, and checkout securely. Built by Omid Teimory."
      />
      {step === 1 && (
        <ShoppingCart
          step={step}
          setStep={setStep}
          product={product}
          setProduct={setProduct}
        />
      )}

      {step === 2 && (
        <Checkout
          step={step}
          setStep={setStep}
          product={product}
          setProduct={setProduct}
        />
      )}
    </>
  );
}

export default WithMenuLayout(OrderPage);
