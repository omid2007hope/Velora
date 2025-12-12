import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearBasket } from "../../store/basketSlice";

export default function Checkout({ product, setStep }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    street: "",
    country: "",
    city: "",
    postal: "",
  });

  useEffect(() => {
    try {
      const loadUser = JSON.parse(localStorage.getItem("user")) || {};
      const loadAddress = JSON.parse(localStorage.getItem("savedAddress")) || {};
      const loadPayment = JSON.parse(localStorage.getItem("savedPayment")) || {};

      setForm((prev) => ({
        ...prev,
        email: loadUser.email || prev.email,
        fullName: loadUser.fullName || prev.fullName,
        cardNumber: loadPayment.cardNumber || prev.cardNumber,
        expiry: loadPayment.expiry || prev.expiry,
        cvv: loadPayment.cvv || prev.cvv,
        street: loadAddress.street || prev.street,
        country: loadAddress.country || prev.country,
        city: loadAddress.city || prev.city,
        postal: loadAddress.postal || prev.postal,
      }));
    } catch {
      // ignore parse errors
    }
  }, []);

  const cartItems = product || [];

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.newPrice || 0) * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const shipping = cartItems.length > 0 ? 5 : 0;
  const tax = cartItems.length > 0 ? 8.32 : 0;
  const total = subtotal + shipping + tax;

  const goBack = () => setStep(1);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const required = [
      "email",
      "fullName",
      "cardNumber",
      "expiry",
      "cvv",
      "street",
      "country",
      "city",
      "postal",
    ];

    for (const key of required) {
      if (!form[key]?.trim()) {
        alert("Please complete all required fields before paying.");
        return false;
      }
    }

    if (form.cardNumber.replace(/\D/g, "").length < 12) {
      alert("Card number looks too short.");
      return false;
    }

    if (form.cvv.replace(/\D/g, "").length < 3) {
      alert("CVV looks too short.");
      return false;
    }

    return true;
  };

  const handlePay = () => {
    if (!validate()) return;

    localStorage.setItem(
      "savedPayment",
      JSON.stringify({
        cardNumber: form.cardNumber,
        expiry: form.expiry,
        cvv: form.cvv,
      })
    );

    localStorage.setItem(
      "savedAddress",
      JSON.stringify({
        street: form.street,
        country: form.country,
        city: form.city,
        postal: form.postal,
      })
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        fullName: form.fullName,
        email: form.email,
      })
    );
    window.dispatchEvent(new Event("user-updated"));

    dispatch(clearBasket());
    alert("Payment submitted! A confirmation email is on its way.");
    setStep(1);
    navigate("/");
  };

  return (
    <div className="bg-orange-100 min-h-screen px-4 sm:px-6 lg:px-8 py-8 pt-28">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
        {/* LEFT: FORM */}
        <div className="lg:col-span-7 bg-orange-200 p-6 rounded-xl border border-amber-950 shadow-lg flex flex-col">
          <button
            type="button"
            onClick={handlePay}
            disabled={cartItems.length === 0}
            className="w-full bg-amber-950 text-white py-3 rounded-md font-semibold disabled:opacity-50"
          >
            Pay securely
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-amber-900"></div>
            <span className="px-3 text-amber-800 text-sm">or</span>
            <div className="flex-grow border-t border-amber-900"></div>
          </div>

          <form className="space-y-4 flex-1">
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Email"
            />

            <input
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Name on card"
            />

            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={onChange}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Card number"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="expiry"
                value={form.expiry}
                onChange={onChange}
                className="border border-amber-950 p-2 rounded-md bg-orange-50"
                placeholder="MM/YY"
              />
              <input
                name="cvv"
                value={form.cvv}
                onChange={onChange}
                className="border border-amber-950 p-2 rounded-md bg-orange-50"
                placeholder="CVV"
              />
            </div>

            <input
              name="street"
              value={form.street}
              onChange={onChange}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Address"
            />

            <div className="grid grid-cols-3 gap-3">
              <input
                name="country"
                value={form.country}
                onChange={onChange}
                className="border border-amber-950 rounded-md p-2 bg-orange-50"
                placeholder="Country"
              />
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                className="border border-amber-950 rounded-md p-2 bg-orange-50"
                placeholder="City"
              />
              <input
                name="postal"
                value={form.postal}
                onChange={onChange}
                className="border border-amber-950 rounded-md p-2 bg-orange-50"
                placeholder="Postal Code"
              />
            </div>
          </form>

          <div className="mt-6 space-y-3">
            <button
              onClick={goBack}
              className="w-full bg-amber-950 text-white py-3 rounded-md"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handlePay}
              disabled={cartItems.length === 0}
              className="w-full bg-amber-950 text-white py-3 rounded-md disabled:opacity-50"
            >
              Pay ${total.toFixed(2)}
            </button>
          </div>
        </div>

        {/* RIGHT: CART */}
        <div className="lg:col-span-5 mt-10 lg:mt-0">
          <div className="bg-orange-200 border border-amber-950 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-amber-950 mb-4">Your Cart</h2>

            <ul className="divide-y divide-amber-900">
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex py-4"
                >
                  <img
                    src={item.image}
                    className="h-16 w-16 rounded-md border border-amber-950 object-cover"
                    alt={item.name}
                  />

                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-semibold text-amber-950">
                      {item.name}
                    </h3>
                    <p className="text-sm text-amber-900">
                      {item.selectedColor || "Selected color"} |{" "}
                      {item.selectedSize || "Selected size"}
                    </p>
                    <p className="text-xs text-green-700 mt-1">In stock</p>
                  </div>

                  <p className="text-sm font-bold text-amber-950">
                    ${Number(item.newPrice).toFixed(2)} x {item.quantity || 1}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-amber-800">Subtotal</dt>
                <dd className="text-sm font-medium text-amber-950">
                  ${subtotal.toFixed(2)}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-sm text-amber-800">Shipping</dt>
                <dd className="text-sm font-medium text-amber-950">
                  ${shipping.toFixed(2)}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-sm text-amber-800">Tax</dt>
                <dd className="text-sm font-medium text-amber-950">
                  ${tax.toFixed(2)}
                </dd>
              </div>

              <div className="border-t border-amber-800 pt-3 flex justify-between">
                <dt className="text-base font-semibold text-amber-950">
                  Total
                </dt>
                <dd className="text-base font-semibold text-amber-950">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
