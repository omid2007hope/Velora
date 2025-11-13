import { useState } from "react";
import ShoppingCart from "../components/Order/ShoppingCart";
import Checkout from "../components/Order/Checkout";

function Order() {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState([]);

  console.log(product);

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
      ,
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

export default Order;
