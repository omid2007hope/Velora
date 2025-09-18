import React from "react";

import Shirt from "../assets/Images/Shirt.png";

export default function ShoppingCart() {
  const cartItems = [
    {
      id: 1,
      name: "Basic Tee",
      color: "Sienna",
      size: "Large",
      price: 32,
      status: "In stock",
      image: Shirt,
    },
    {
      id: 2,
      name: "Basic Tee",
      color: "Black",
      size: "Large",
      price: 32,
      status: "Ships in 3–4 weeks",
      image: Shirt,
    },
    {
      id: 3,
      name: "Nomad Tumbler",
      color: "White",
      size: "",
      price: 35,
      status: "In stock",
      image: Shirt,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 5.0;
  const tax = 8.32;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-orange-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-amber-950 mb-6">
        Shopping Cart
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Cart Items */}
        <div className="lg:col-span-7">
          <ul className="divide-y divide-amber-950">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex py-6 sm:py-2 bg-orange-200 border-2 border-amber-950 rounded-lg my-2"
              >
                <div className="flex-shrink-0 ml-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32 border-2 border-amber-950"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6 ">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-amber-950 mt-1">
                          {item.name}
                        </h3>
                        <p className="text-sm font-medium text-amber-950 mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-amber-900">
                        {item.color} {item.size && `| ${item.size}`}
                      </p>
                    </div>

                    <div className="mt-1 sm:mt-1 sm:pr-9">
                      <select className="w-16 rounded-md border-amber-950 text-amber-950 shadow-sm focus:border-amber-950 focus:ring-amber-950 sm:text-sm">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>

                      <button
                        type="button"
                        className="absolute right-0 top-0 text-amber-900 hover:text-amber-950 mr-4"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <p
                    className={`mt-2 text-sm mb-1 ${
                      item.status.includes("In stock")
                        ? "text-amber-900"
                        : "text-amber-900"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="mt-10 lg:col-span-5 lg:mt-0">
          <div className="rounded-lg bg-orange-200 shadow-md border-2 border-amber-950 p-6 mt-2">
            <h2 className="text-lg font-medium text-amber-950 mb-6">
              Order summary
            </h2>
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-amber-800">Subtotal</dt>
                <dd className="text-sm font-medium text-amber-950">
                  ${subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-amber-800">Shipping estimate</dt>
                <dd className="text-sm font-medium text-amber-950">
                  ${shipping.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-amber-800">Tax estimate</dt>
                <dd className="text-sm font-medium text-amber-950">
                  ${tax.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-amber-950">
                  Order total
                </dt>
                <dd className="text-base font-medium text-amber-950">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <button className="mt-6 w-full rounded-md bg-amber-950 px-4 py-3 text-base font-medium text-orange-50 shadow hover:bg-amber-900">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
