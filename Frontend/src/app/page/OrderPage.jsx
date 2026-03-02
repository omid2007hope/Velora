import { useState } from "react";
import ShoppingCart from "../component/layout/orderPage/BasketPage";
import Checkout from "../component/layout/orderPage/CheckoutForm";
import WithMenuLayout from "../component/layout/index";

function OrderPage() {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState([]);

  return (
    <>
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
