import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/Checkout";

import { useState } from "react";

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
