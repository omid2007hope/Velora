import React from "react";
import Shirt from "../../assets/Images/Shirt.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ShoppingCart(props) {
  const cartItems = [];
  const loadItems = useSelector((state) => state.list);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 5.0;
  const tax = 8.32;
  const total = subtotal + shipping + tax;

  const handleSubmit = () => {
    props.setStep(2);
  };

  return (
    <div className="bg-orange-100 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 w-full">
        {/* Cart Section */}
        <div className="lg:col-span-7 flex flex-col">
          <h1 className="text-2xl font-bold text-amber-950 border-b-2 border-amber-900 pb-3 mb-6">
            Shopping Cart
          </h1>

          <ul className="space-y-5">
            {loadItems && loadItems.length
              ? loadItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center bg-orange-200 border border-amber-950 rounded-xl shadow-md p-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 sm:h-28 sm:w-28 rounded-lg object-cover border border-amber-900"
                    />
                    <div className="ml-5 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-amber-950">
                            {item.name}
                          </h3>
                          <p className="text-sm text-amber-900">
                            {item.color} {item.size && `| ${item.size}`}
                          </p>
                          <p
                            className={`text-xs mt-2 ${
                              item.status === "In stock"
                                ? "text-green-700"
                                : "text-amber-700"
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-amber-950">
                          ${item.newPrice.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center space-x-4">
                        <select className="w-20 rounded-md border border-amber-950 text-amber-950 bg-orange-50 shadow-sm focus:ring-amber-950 focus:border-amber-950 sm:text-sm">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                        <button
                          type="button"
                          className="text-sm text-red-700 hover:text-red-900 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              : {}}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 mt-10 lg:mt-0">
          <div className="rounded-xl bg-orange-200 border border-amber-950 shadow-lg p-6 flex flex-col">
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
                <dt className="text-sm text-amber-800">Shipping estimate</dt>
                <dd className="text-sm font-medium text-amber-950">
                  ${shipping.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-amber-800">Tax estimate</dt>
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
                className="w-full rounded-lg bg-amber-950 px-4 py-3 text-base font-medium text-orange-50 hover:bg-amber-900 mt-5"
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
