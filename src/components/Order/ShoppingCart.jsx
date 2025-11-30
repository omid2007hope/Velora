import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../store/basketSlice";

export default function ShoppingCart({ setStep, setProduct }) {
  const dispatch = useDispatch();
  const loadItems = useSelector((state) => state.basket) || [];

  const subtotal = loadItems.reduce(
    (sum, item) => sum + item.newPrice * (item.quantity || 1),
    0
  );

  const shipping = loadItems.length > 0 ? 5 : 0;
  const tax = loadItems.length > 0 ? 8.32 : 0;
  const total = subtotal + shipping + tax;

  const handleSubmit = () => {
    setProduct(loadItems);
    setStep(2);
  };

  const handleQuantityChange = (item, quantity) => {
    dispatch(
      updateQuantity({
        id: item.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity,
      })
    );
  };

  return (
    <div className="bg-orange-100 min-h-screen px-4 sm:px-6 lg:px-8 py-8 pt-28">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 w-full">
        <div className="lg:col-span-7 flex flex-col">
          <h1 className="text-2xl font-bold text-amber-950 border-b-2 border-amber-900 pb-3 mb-6">
            Shopping Cart
          </h1>

          {loadItems.length === 0 ? (
            <p className="text-amber-800 text-lg">Your cart is empty.</p>
          ) : (
            <ul className="space-y-5">
              {loadItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center bg-orange-200 border border-amber-950 rounded-xl shadow-md p-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover border border-amber-900"
                  />

                  <div className="ml-5 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-amber-950">
                          {item.name}
                        </h3>
                        <p className="text-sm text-amber-900">
                          {item.selectedColor && item.selectedSize
                            ? `${item.selectedColor} | ${item.selectedSize}`
                            : "Selected options"}
                        </p>
                        <p className="text-xs mt-2 text-green-700">In stock</p>
                      </div>

                      <p className="text-sm font-bold text-amber-950">
                        ${Number(item.newPrice).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center space-x-4">
                      <select
                        value={item.quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(item, e.target.value)
                        }
                        className="w-20 rounded-md border border-amber-950 text-amber-950 bg-orange-50 shadow-sm"
                      >
                        {[1, 2, 3, 4, 5].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() =>
                          dispatch(
                            removeItem({
                              id: item.id,
                              selectedColor: item.selectedColor,
                              selectedSize: item.selectedSize,
                            })
                          )
                        }
                        className="text-sm text-red-700 hover:text-red-900 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-5 mt-10 lg:mt-0">
          <div className="rounded-xl bg-orange-200 border border-amber-950 shadow-lg p-6">
            <h2 className="text-xl font-bold text-amber-950 mb-5">
              Order Summary
            </h2>

            <dl className="space-y-3">
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

              <div className="border-t border-amber-900 pt-4 mt-4 flex justify-between">
                <dt className="text-base font-semibold text-amber-950">
                  Order total
                </dt>
                <dd className="text-base font-semibold text-amber-950">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-8 space-y-3">
              <Link to="/">
                <button className="w-full rounded-lg bg-amber-950 px-4 py-3 text-base font-medium text-orange-50 hover:bg-amber-900">
                  Back
                </button>
              </Link>

              <button
                onClick={handleSubmit}
                disabled={loadItems.length === 0}
                className="w-full mt-2 rounded-lg bg-amber-950 px-4 py-3 text-base font-medium text-orange-50 hover:bg-amber-900 disabled:opacity-50"
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
