import SideBarLayOut from "./Layout";
import { useState } from "react";

function PaymentForm() {
  const [payment, setPayment] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPayment((p) => ({ ...p, [name]: value }));
  }

  function handleSave() {
    localStorage.setItem("savedPayment", JSON.stringify(payment));
    alert("Payment method saved");
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#FEF5EC] text-[#3C1D00]">
      <div className="border rounded-md shadow-sm border-[#BCA389] p-6 w-[90%] max-w-lg">
        <h2 className="font-bold text-lg mb-2">Payment Methods</h2>
        <p className="text-xs mb-4">
          Add or update your payment details. Your information is stored
          securely.
        </p>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Cardholder Name"
            value={payment.name}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-[#FFF8F1]"
          />
          <input
            name="cardNumber"
            placeholder="Card Number"
            value={payment.cardNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-[#FFF8F1]"
          />
          <div className="flex gap-3">
            <input
              name="expiry"
              placeholder="MM/YY"
              value={payment.expiry}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded bg-[#FFF8F1]"
            />
            <input
              name="cvv"
              placeholder="CVV"
              value={payment.cvv}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded bg-[#FFF8F1]"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-[#5B2C00] text-white py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            className="border border-[#5B2C00] text-[#5B2C00] py-2 px-4 rounded"
            onClick={() => (window.location.href = "/shop")}
          >
            continue to Shop
          </button>
        </div>
      </div>
    </div>
  );
}

const WrappedPaymentForm = SideBarLayOut(PaymentForm);

export default WrappedPaymentForm;
