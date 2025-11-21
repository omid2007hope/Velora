export default function Checkout({ product, setStep }) {
  const loadUser = JSON.parse(localStorage.getItem("user")) || {};
  const loadAddress = JSON.parse(localStorage.getItem("savedAddress")) || {};
  const loadPayment = JSON.parse(localStorage.getItem("savedPayment")) || {};

  const cartItems = product || [];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.newPrice || 0),
    0
  );

  const shipping = cartItems.length > 0 ? 5 : 0;
  const tax = cartItems.length > 0 ? 8.32 : 0;
  const total = subtotal + shipping + tax;

  const goBack = () => setStep(1);

  return (
    <div className="bg-orange-100 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
        {/* LEFT: FORM */}
        <div className="lg:col-span-7 bg-orange-200 p-6 rounded-xl border border-amber-950 shadow-lg flex flex-col">
          <button className="w-full bg-amber-950 text-white py-3 rounded-md font-semibold">
             Pay
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-amber-900"></div>
            <span className="px-3 text-amber-800 text-sm">or</span>
            <div className="flex-grow border-t border-amber-900"></div>
          </div>

          <form className="space-y-4 flex-1">
            <input
              readOnly={!!loadUser.email}
              defaultValue={loadUser.email || ""}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Email"
            />

            <input
              readOnly={!!loadUser.fullName}
              defaultValue={loadUser.fullName || ""}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Name on card"
            />

            <input
              readOnly={!!loadPayment.cardNumber}
              defaultValue={loadPayment.cardNumber || ""}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Card number"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                readOnly={!!loadPayment.expiry}
                defaultValue={loadPayment.expiry || ""}
                className="border border-amber-950 p-2 rounded-md bg-orange-50"
                placeholder="MM/YY"
              />
              <input
                readOnly={!!loadPayment.cvv}
                defaultValue={loadPayment.cvv || ""}
                className="border border-amber-950 p-2 rounded-md bg-orange-50"
                placeholder="CVV"
              />
            </div>

            <input
              readOnly={!!loadAddress.street}
              defaultValue={loadAddress.street || ""}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50"
              placeholder="Address"
            />

            <div className="grid grid-cols-3 gap-3">
              <input
                readOnly={!!loadAddress.country}
                defaultValue={loadAddress.country || ""}
                className="border border-amber-950 rounded-md p-2 bg-orange-50"
                placeholder="Country"
              />
              <input
                readOnly={!!loadAddress.city}
                defaultValue={loadAddress.city || ""}
                className="border border-amber-950 rounded-md p-2 bg-orange-50"
                placeholder="City"
              />
              <input
                readOnly={!!loadAddress.postal}
                defaultValue={loadAddress.postal || ""}
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

            <button className="w-full bg-amber-950 text-white py-3 rounded-md">
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
                <li key={item.id} className="flex py-4">
                  <img
                    src={item.image}
                    className="h-16 w-16 rounded-md border border-amber-950 object-cover"
                  />

                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-semibold text-amber-950">
                      {item.name}
                    </h3>
                    <p className="text-sm text-amber-900">
                      {item.color} {item.size && `| ${item.size}`}
                    </p>
                    <p className="text-xs text-green-700 mt-1">In stock</p>
                  </div>

                  <p className="text-sm font-bold text-amber-950">
                    ${item.newPrice.toFixed(2)}
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
