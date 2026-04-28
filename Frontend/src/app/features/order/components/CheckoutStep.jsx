"use client";

import CartSummary from "@/app/features/order/components/CartSummary";
import { useCheckoutForm } from "@/app/features/order/hooks/use-checkout-form";

export default function CheckoutStep({ cartItems = [], onBack, onComplete }) {
  const {
    form,
    updateField,
    submitOrder,
    pricing,
    submitting,
    submitError,
    submitMessage,
  } = useCheckoutForm(cartItems, onComplete);

  async function handlePay() {
    await submitOrder();
  }

  return (
    <div className="min-h-screen bg-orange-100 px-4 py-8 pt-28 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col rounded-xl border border-amber-950 bg-orange-200 p-6 shadow-lg lg:col-span-7">
          <form className="flex-1 space-y-4">
            <input
              name="email"
              id="checkout-email"
              value={form.email}
              onChange={updateField}
              className="w-full rounded-md border border-amber-950 bg-orange-50 p-2"
              placeholder="Email"
            />
            <input
              name="fullName"
              id="checkout-name"
              value={form.fullName}
              onChange={updateField}
              className="w-full rounded-md border border-amber-950 bg-orange-50 p-2"
              placeholder="Full name"
            />
            <input
              name="street"
              id="checkout-address"
              value={form.street}
              onChange={updateField}
              className="w-full rounded-md border border-amber-950 bg-orange-50 p-2"
              placeholder="Address"
            />

            <div className="grid grid-cols-3 gap-3">
              <input
                name="country"
                id="checkout-country"
                value={form.country}
                onChange={updateField}
                className="rounded-md border border-amber-950 bg-orange-50 p-2"
                placeholder="Country"
              />
              <input
                name="city"
                id="checkout-city"
                value={form.city}
                onChange={updateField}
                className="rounded-md border border-amber-950 bg-orange-50 p-2"
                placeholder="City"
              />
              <input
                name="postal"
                id="checkout-postal"
                value={form.postal}
                onChange={updateField}
                className="rounded-md border border-amber-950 bg-orange-50 p-2"
                placeholder="Postal Code"
              />
            </div>
          </form>

          <div className="mt-6 space-y-3">
            {submitError ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {submitError}
              </p>
            ) : null}

            {submitMessage ? (
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {submitMessage}
              </p>
            ) : null}

            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-md bg-amber-950 py-3 text-white"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handlePay}
              disabled={cartItems.length === 0 || submitting}
              className="w-full rounded-md bg-amber-950 py-3 text-white disabled:opacity-50"
            >
              {submitting
                ? "Processing..."
                : `Pay $${pricing.total.toFixed(2)}`}
            </button>
          </div>
        </div>

        <div className="mt-10 lg:col-span-5 lg:mt-0">
          <div className="rounded-xl border border-amber-950 bg-orange-200 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-amber-950">Your Cart</h2>

            <ul className="divide-y divide-amber-900">
              {cartItems.map((item) => {
                const key = `${item.id}-${item.selectedColor}-${item.selectedSize}`;
                const imageSrc = item.image || "/placeholder-product.jpg";

                return (
                  <li key={key} className="flex py-4">
                    <img
                      src={imageSrc}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      width="64"
                      height="64"
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
                      <p className="mt-1 text-xs text-green-700">In stock</p>
                    </div>

                    <p className="text-sm font-bold text-amber-950">
                      ${Number(item.newPrice).toFixed(2)} x {item.quantity || 1}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">
              <CartSummary pricing={pricing} title="Payment Summary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
