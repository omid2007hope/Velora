import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBarLayOut from "./Layout";

function PaymentForm() {
  const [payment, setPayment] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    try {
      const userRaw = localStorage.getItem("user");
      const paymentRaw = localStorage.getItem("savedPayment");

      let base = {
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      };

      if (userRaw) {
        const user = JSON.parse(userRaw);
        if (user?.fullName) base.name = user.fullName;
      }

      if (paymentRaw) {
        const saved = JSON.parse(paymentRaw);
        base = { ...base, ...saved };
      }

      setPayment(base);
    } catch {
      // ignore parsing errors
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem("savedPayment", JSON.stringify(payment));
    alert("Payment method saved");
  }

  return (
    <div className="w-full max-w-lg border rounded-md shadow-sm border-[#BCA389] bg-white p-6 text-[#3C1D00]">
      <h2 className="font-bold text-lg mb-2">Payment Methods</h2>
      <p className="text-xs mb-4">
        Add or update your payment details. Your information is stored securely.
      </p>

      <form onSubmit={handleSave} className="space-y-3">
        <input
          name="name"
          placeholder="Cardholder Name"
          value={payment.name}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />
        <input
          name="cardNumber"
          placeholder="Card Number"
          value={payment.cardNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            name="expiry"
            placeholder="MM/YY"
            value={payment.expiry}
            onChange={handleChange}
            className="w-full sm:w-1/2 p-2 border rounded bg-amber-50 text-sm"
          />
          <input
            name="cvv"
            placeholder="CVV"
            value={payment.cvv}
            onChange={handleChange}
            className="w-full sm:w-1/2 p-2 border rounded bg-amber-50 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="submit"
            className="bg-[#5B2C00] text-white py-2 px-4 rounded text-sm hover:bg-amber-900"
          >
            Save
          </button>

          <Link to="/">
            <button
              type="button"
              className="py-2 px-4 bg-orange-100 text-amber-900 rounded-md shadow text-sm hover:bg-amber-950 hover:text-orange-50 transition"
            >
              Continue to shop
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const WrappedPaymentForm = SideBarLayOut(PaymentForm);

export default WrappedPaymentForm;
