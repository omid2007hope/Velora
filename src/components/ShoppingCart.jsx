import React from "react";
import Shirt from "../assets/Images/Shirt.png";
import { Link } from "react-router-dom";

export default function ShoppingCart(props) {
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

  const handleSubmit = () => {
    props.setStep(2);
  };

  return (
    <div className="bg-orange-100 min-h-screen flex items-stretch px-4 sm:px-6 lg:px-8 py-6">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 w-full">
        {/* Left - Cart Items */}
        <div className="lg:col-span-7 h-full flex flex-col">
          <div className="w-full bg-orange-200 text-amber-950 py-5 sm:py-5 lg:py-5 mb-4 sm:mb-4 lg:mb-4 rounded-lg border-2 border-amber-950  ">
            <div>
              <a className="ml-5 font-bold"> Shopping Cart</a>
            </div>
          </div>

          <ul className="space-y-4 flex-1">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center bg-orange-200 border-2 border-amber-950 rounded-lg shadow-sm p-4 relative"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-md object-cover border-2 border-amber-950"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold text-amber-950">
                        {item.name}
                      </h3>
                      <p className="text-sm text-amber-900">
                        {item.color} {item.size && `| ${item.size}`}
                      </p>
                      <p className="text-xs text-amber-800 mt-1">
                        {item.status}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-amber-950">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center space-x-3">
                    <select className="w-20 rounded-md border-amber-950 text-amber-950 shadow-sm focus:border-amber-950 focus:ring-amber-950 sm:text-sm">
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
            ))}
          </ul>
        </div>

        {/* Right - Order Summary */}
        <div className="lg:col-span-5 h-auto sm:h-auto lg:h-full flex flex-col mt-8 lg:mt-0">
          <div className="rounded-lg bg-orange-200 shadow-md border-2 border-amber-950 p-6 flex flex-col h-full">
            <h2 className="text-lg font-medium text-amber-950 mb-4 sm:mb-4 lg:mb-4">
              Order Summary
            </h2>

            <dl className="space-y-3 flex-1">
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
              <div className="flex items-center justify-between border-t border-amber-800 pt-3 mb-10 sm:mb-20 lg:mb-10">
                <dt className="text-base font-semibold text-amber-950">
                  Order total
                </dt>
                <dd className="text-base font-semibold text-amber-950">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <Link to="/">
              <button className="mt-6 w-full rounded-md bg-amber-950 px-4 py-3 text-base font-medium text-orange-50 shadow hover:bg-amber-900">
                Back
              </button>
            </Link>

            <button
              className="mt-6 w-full rounded-md bg-amber-950 px-4 py-3 text-base font-medium text-orange-50 shadow hover:bg-amber-900"
              onClick={handleSubmit}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
