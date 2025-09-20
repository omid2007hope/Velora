import { useState } from "react";
import ShoppingCart from "../components/Order/ShoppingCart";
import Checkout from "../components/Order/Checkout";

function Order() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <ShoppingCart step={step} setStep={setStep} />},
      {step === 2 && <Checkout step={step} setStep={setStep} />}
    </>
  );
}

export default Order;
