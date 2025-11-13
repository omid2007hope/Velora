import { Link } from "react-router-dom";
import SideBarLayOut from "./Layout";
import { useState } from "react";

function PaymentForm() {
  const [payment, setPayment] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const loadPayment = JSON.parse(localStorage.getItem("savedPayment"));

  console.log(loadPayment);

  function handleChange(e) {
    const { name, value } = e.target;
    setPayment((p) => ({ ...p, [name]: value }));
  }

  function handleSave() {
    localStorage.setItem("savedPayment", JSON.stringify(payment));
    alert("Payment method saved");
  }

  return (
    <div className="flex flex-col pt-5 justify-start items-center w-full h-screen bg-[#FEF5EC] text-[#3C1D00]">
      <div className="border rounded-md shadow-sm border-[#BCA389] bg-white p-6 w-[90%] max-w-lg">
        <h2 className="font-bold text-lg mb-2">Payment Methods</h2>
        <p className="text-xs mb-4">
          Add or update your payment details. Your information is stored
          securely.
        </p>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Cardholder Name"
            value={loadPayment.name}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50"
          />
          <input
            name="cardNumber"
            placeholder="Card Number"
            value={loadPayment.cardNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50"
          />
          <div className="flex gap-3">
            <input
              name="expiry"
              placeholder="MM/YY"
              value={loadPayment.expiry}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded bg-amber-50"
            />
            <input
              name="cvv"
              placeholder="CVV"
              value={loadPayment.cvv}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded bg-amber-50"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-[#5B2C00] text-white py-2 px-4 rounded hover:bg-amber-900"
          >
            Save
          </button>
          <Link to="/">
            <button className="py-2 px-4 bg-orange-100 text-amber-900 rounded-md shadow hover:bg-amber-950 hover:text-orange-50 transition">
              continue to Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const WrappedPaymentForm = SideBarLayOut(PaymentForm);

export default WrappedPaymentForm;
