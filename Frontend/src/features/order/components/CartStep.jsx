"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "@/app/redux/slice/BasketSlice";
import CartSummary from "@/features/order/components/CartSummary";
import { calculateOrderPricing } from "@/features/order/utils/order-pricing";

export default function CartStep({ onContinue }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.basket);
  const pricing = useMemo(() => calculateOrderPricing(cartItems), [cartItems]);

  function handleQuantityChange(item, quantity) {
    dispatch(
      updateQuantity({
        id: item.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity,
      }),
    );
  }

  function handleRemove(item) {
    dispatch(
      removeItem({
        id: item.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      }),
    );
  }

  return (
    <div className="min-h-screen bg-orange-100 px-4 py-8 pt-28 sm:px-6 lg:px-8">
      <div className="w-full lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <h1 className="mb-6 border-b-2 border-amber-900 pb-3 text-2xl font-bold text-amber-950">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-lg text-amber-800">Your cart is empty.</p>
          ) : (
            <ul className="space-y-5">
              {cartItems.map((item) => {
                const imageSrc = item.image || "/placeholder-product.jpg";
                const key = `${item.id}-${item.selectedColor}-${item.selectedSize}`;

                return (
                  <li
                    key={key}
                    className="flex items-center rounded-xl border border-amber-950 bg-orange-200 p-5 shadow-md"
                  >
                    <img
                      src={imageSrc}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="h-24 w-24 rounded-lg border border-amber-900 object-cover"
                    />

                    <div className="ml-5 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-amber-950">
                            {item.name}
                          </h3>
                          <p className="text-sm text-amber-900">
                            {item.selectedColor && item.selectedSize
                              ? `${item.selectedColor} | ${item.selectedSize}`
                              : "Selected options"}
                          </p>
                          <p className="mt-2 text-xs text-green-700">In stock</p>
                        </div>

                        <p className="text-sm font-bold text-amber-950">
                          ${Number(item.newPrice).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center space-x-4">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">
                          Quantity for {item.name}
                        </label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity || 1}
                          onChange={(event) =>
                            handleQuantityChange(item, Number(event.target.value))
                          }
                          className="w-20 rounded-md border border-amber-950 bg-orange-50 text-amber-950 shadow-sm"
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleRemove(item)}
                          className="text-sm font-medium text-red-700 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-10 lg:col-span-5 lg:mt-0">
          <div className="rounded-xl border border-amber-950 bg-orange-200 p-6 shadow-lg">
            <CartSummary pricing={pricing} />

            <div className="mt-8 space-y-3">
              <Link
                href="/"
                className="block w-full rounded-lg bg-amber-950 px-4 py-3 text-center text-base font-medium text-orange-50 hover:bg-amber-900"
              >
                Back
              </Link>

              <button
                onClick={() => onContinue(cartItems)}
                disabled={cartItems.length === 0}
                className="mt-2 w-full rounded-lg bg-amber-950 px-4 py-3 text-base font-medium text-orange-50 hover:bg-amber-900 disabled:opacity-50"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
