import React from "react";
import Shirt from "../assets/Images/Shirt.png";

export default function Checkout(props) {
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

  const handleBack = () => {
    props.setStep(1);
  };

  return (
    <div className="bg-orange-100 min-h-screen flex items-stretch px-4 sm:px-6 lg:px-8 py-6">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 w-full">
        {/* Left - Payment Form */}
        <div className="lg:col-span-7 bg-orange-200 border-2 border-amber-950 rounded-lg shadow-md p-6 h-full flex flex-col">
          <button className="w-full bg-amber-950 text-orange-50 py-3 rounded-md hover:bg-amber-900">
             Pay
          </button>
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-amber-800"></div>
            <span className="px-3 text-amber-800 text-sm">or</span>
            <div className="flex-grow border-t border-amber-800"></div>
          </div>

          <form className="space-y-4 flex-1">
            <input
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
              placeholder="Email address"
            />
            <input
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
              placeholder="Name on card"
            />
            <input
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
              placeholder="Card number"
            />
            <div className="flex space-x-2">
              <input
                className="flex-1 border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="MM/YY"
              />
              <input
                className="flex-1 border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="CVC"
              />
            </div>
            <input
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
              placeholder="Address"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                className="border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="City"
              />
              <input
                className="border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="State/Province"
              />
              <input
                className="border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="Postal Code"
              />
            </div>
            <label className="flex items-center space-x-2 text-sm text-amber-800">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 border-amber-950 text-amber-900"
              />
              <span>Billing address is the same as shipping address</span>
            </label>
          </form>

          <button
            className="w-full bg-amber-950 text-orange-50 py-3 rounded-md hover:bg-amber-900"
            onClick={handleBack}
          >
            Back
          </button>

          <button className="mt-6 w-full bg-amber-950 text-orange-50 py-3 rounded-md hover:bg-amber-900">
            Pay ${total.toFixed(2)}
          </button>
        </div>

        {/* Right - Cart Summary */}
        <div className="lg:col-span-5 h-full flex flex-col">
          <div className="rounded-lg bg-orange-200 shadow-md border-2 border-amber-950 p-6 h-full flex flex-col">
            <h2 className="text-lg font-medium text-amber-950 mb-4">
              Your Cart
            </h2>
            <ul className="divide-y divide-amber-950 flex-1">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-md border-2 border-amber-950 object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-amber-950">
                      {item.name}
                    </h3>
                    <p className="text-sm text-amber-900">
                      {item.color} {item.size && `| ${item.size}`}
                    </p>
                    <p className="text-xs text-amber-800">{item.status}</p>
                  </div>
                  <p className="text-sm font-medium text-amber-950">
                    ${item.price.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            {/* Discount Code */}
            <div className="flex mt-4">
              <input
                className="flex-1 border border-amber-950 rounded-l-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="Discount code"
              />
              <button className="bg-amber-950 text-orange-50 px-4 rounded-r-md hover:bg-amber-900">
                Apply
              </button>
            </div>

            {/* Totals */}
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
                <dt className="text-sm text-amber-800">Taxes</dt>
                <dd className="text-sm font-medium text-amber-950">
                  ${tax.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-amber-800 pt-2">
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
