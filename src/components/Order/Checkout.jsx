import Shirt from "../../assets/Images/Shirt.png";

const loadUser = JSON.parse(localStorage.getItem("user"));
const loadAddress = JSON.parse(localStorage.getItem("savedAddress"));
const loadPayment = JSON.parse(localStorage.getItem("savedPayment"));

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

  // const [checkOut, setCheckOut] = useState({
  //   email: loadUser.email,
  //   fullName: loadUser.fullName,
  //   cardNumber: loadPayment.cardNumber,

  // });

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setCheckOut((p) => ({ ...p, [name]: value }));
  // }

  return (
    <div className="bg-orange-100 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 w-full">
        {/* Left - Payment Form */}
        <div className="lg:col-span-7 bg-orange-200 border border-amber-950 rounded-xl shadow-lg p-6 flex flex-col">
          {/* Apple Pay */}
          <button className="w-full bg-amber-950 text-orange-50 py-3 rounded-lg font-semibold hover:bg-amber-900 transition">
             Pay
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-amber-800"></div>
            <span className="px-3 text-amber-800 text-sm">or</span>
            <div className="flex-grow border-t border-amber-800"></div>
          </div>

          {/* Form */}
          <form className="space-y-4 flex-1">
            <input
              value={loadUser.email}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
              placeholder="Email address"
            />
            <input
              value={loadUser.fullName}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
              placeholder="Name on card"
            />
            <input
              value={loadPayment.cardNumber}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
              placeholder="Card number"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={loadPayment.expiry}
                className="flex-1 border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="MM/YY"
              />
              <input
                value={loadPayment.cvv}
                className="flex-1 border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="CVV"
              />
            </div>
            <input
              value={loadAddress.street}
              className="w-full border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
              placeholder="Address"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                value={loadAddress.country}
                className="border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="Country"
              />
              <input
                value={loadAddress.city}
                className="border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="State/Province"
              />
              <input
                value={loadAddress.postal}
                className="border border-amber-950 rounded-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="Postal Code"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-center space-x-2 text-sm text-amber-800">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 border-amber-950 text-amber-900 focus:ring-amber-950"
              />
              <span>Billing address is the same as shipping address</span>
            </label>
          </form>

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <button
              className="w-full bg-amber-950 text-orange-50 py-3 rounded-lg font-medium hover:bg-amber-900 transition"
              onClick={handleBack}
            >
              Back
            </button>
            <button className="w-full bg-amber-950 text-orange-50 py-3 rounded-lg font-medium hover:bg-amber-900 transition">
              Pay ${total.toFixed(2)}
            </button>
          </div>
        </div>

        {/* Right - Cart Summary */}
        <div className="lg:col-span-5 mt-10 lg:mt-0">
          <div className="rounded-xl bg-orange-200 border border-amber-950 shadow-lg p-6 flex flex-col h-full">
            <h2 className="text-xl font-bold text-amber-950 mb-4">Your Cart</h2>

            {/* Items */}
            <ul className="divide-y divide-amber-800 flex-1">
              {props.product.map((item) => (
                <li key={item.id} className="flex py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-md border border-amber-950 object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-semibold text-amber-950">
                      {item.name}
                    </h3>
                    <p className="text-sm text-amber-900">
                      {item.color} {item.size && `| ${item.size}`}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
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
                </li>
              ))}
            </ul>

            {/* Discount */}
            <div className="flex mt-5">
              <input
                className="flex-1 border border-amber-950 rounded-l-md p-2 bg-orange-50 placeholder-amber-800"
                placeholder="Discount code"
              />
              <button className="bg-amber-950 text-orange-50 px-4 rounded-r-md hover:bg-amber-900 transition">
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
