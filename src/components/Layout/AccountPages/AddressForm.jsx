import { Link } from "react-router-dom";
import SideBarLayOut from "./Layout";

import { useState } from "react";

function AddressForm() {
  const [address, setAddress] = useState({
    country: "",
    city: "",
    postal: "",
    street: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setAddress((p) => ({ ...p, [name]: value }));
  }

  function handleSave() {
    localStorage.setItem("savedAddress", JSON.stringify(address));
    alert("Address saved");
  }

  return (
    <div className="flex flex-col pt-5 justify-start items-center w-full h-screen bg-[#FEF5EC] text-[#3C1D00]">
      <div className="border rounded-md shadow-sm border-[#BCA389] bg-white p-6 w-[90%] max-w-lg">
        <h2 className="font-bold text-lg mb-2">Addresses</h2>
        <p className="text-xs mb-4">Add or edit your shipping address below.</p>

        <div className="space-y-3">
          <input
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50"
          />
          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50"
          />
          <input
            name="postal"
            placeholder="Postal Code"
            value={address.postal}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50"
          />
          <input
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-[#5B2C00] text-white py-2 px-4 rounded hover:bg-amber-900"
          >
            Save
          </button>
          <Link to="/">
            <button className="py-2 px-4 bg-orange-100 text-amber-900 rounded-md shadow hover:bg-amber-950 hover:text-orange-50 transition">
              continue to Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ✅ Give the wrapped component a name before export
const WrappedPaymentForm = SideBarLayOut(AddressForm);

export default WrappedPaymentForm;
