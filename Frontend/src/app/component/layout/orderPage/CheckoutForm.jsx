"use client";
// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearBasket } from "../../../redux/slice/BasketSlice";
import { createOrder } from "../../../api/API_Order";

export default function Checkout({ product, setStep }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    street: "",
    country: "",
    city: "",
    postal: "",
  });

  useEffect(() => {
    try {
      // Remove any legacy persisted card data; payment info must never be kept client-side.
      localStorage.removeItem("savedPayment");

      const loadUser = JSON.parse(localStorage.getItem("user")) || {};
      const loadAddress =
        JSON.parse(localStorage.getItem("savedAddress")) || {};

      setForm((prev) => ({
        ...prev,
        email: loadUser.email || prev.email,
        fullName: loadUser.fullName || prev.fullName,
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
        0,
      ),
    [cartItems],
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
    const required = ["email", "fullName", "street", "country", "city", "postal"];

    for (const key of required) {
      if (!form[key]?.trim()) {
        alert("Please complete all required fields before paying.");
        return false;
      }
    }

    return true;
  };

  const handlePay = async () => {
    if (!validate()) return;
    if (!cartItems.length) {
      alert("Add items to your cart first.");
      return;
    }

    try {
      localStorage.setItem(
        "savedAddress",
        JSON.stringify({
          street: form.street,
          country: form.country,
          city: form.city,
          postal: form.postal,
        }),
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: form.fullName,
          email: form.email,
        }),
      );
      window.dispatchEvent(new Event("user-updated"));

      const payload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity || 1,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
        shipping,
        tax,
        currency: "USD",
        addressSnapshot: {
          street: form.street,
          country: form.country,
          city: form.city,
          postalCode: form.postal,
        },
      };

      const orderResponse = await createOrder(payload);
      dispatch(clearBasket());

      if (orderResponse?.paymentIntent?.clientSecret) {
        alert(
          "Payment intent created. Use Stripe Elements to complete the payment with client secret:\n" +
            orderResponse.paymentIntent.clientSecret,
        );
      } else {
        alert("Order created. Payment pending.");
      }
      setStep(1);
      router.push("/order");
    } catch (err) {
      console.error(err);
      alert("Unable to submit order. Please login and try again.");
    }
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
            <label htmlFor="checkout-email" className="sr-only">
              Email
            </label>
            <input
              name="email"
              id="checkout-email"
              value={form.email}
              onChange={onChange}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Email"
            />

            <label htmlFor="checkout-name" className="sr-only">
              Full name
            </label>
            <input
              name="fullName"
              id="checkout-name"
              value={form.fullName}
              onChange={onChange}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Full name"
            />

            <label htmlFor="checkout-address" className="sr-only">
              Address
            </label>
            <input
              name="street"
              id="checkout-address"
              value={form.street}
              onChange={onChange}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Address"
            />

            <div className="grid grid-cols-3 gap-3">
              <label htmlFor="checkout-country" className="sr-only">
                Country
              </label>
              <input
                name="country"
                id="checkout-country"
                value={form.country}
                onChange={onChange}
                className="border border-amber-950 rounded-md p-2 bg-orange-50"
                placeholder="Country"
              />
              <label htmlFor="checkout-city" className="sr-only">
                City
              </label>
              <input
                name="city"
                id="checkout-city"
                value={form.city}
                onChange={onChange}
                className="border border-amber-950 rounded-md p-2 bg-orange-50"
                placeholder="City"
              />
              <label htmlFor="checkout-postal" className="sr-only">
                Postal code
              </label>
              <input
                name="postal"
                id="checkout-postal"
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
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
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
