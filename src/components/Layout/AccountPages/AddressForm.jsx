import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBarLayOut from "./Layout";

function AddressForm() {
  const [address, setAddress] = useState({
    country: "",
    city: "",
    postal: "",
    street: "",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("savedAddress");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAddress((prev) => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch {
      // ignore invalid JSON
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem("savedAddress", JSON.stringify(address));
    alert("Address saved");
  }

  return (
    <div className="w-full max-w-lg border rounded-md shadow-sm border-[#BCA389] bg-white p-6 text-[#3C1D00]">
      <h2 className="font-bold text-lg mb-2">Addresses</h2>
      <p className="text-xs mb-4">Add or edit your shipping address below.</p>

      <form onSubmit={handleSave} className="space-y-3">
        <input
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />
        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />
        <input
          name="postal"
          placeholder="Postal Code"
          value={address.postal}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />
        <input
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-amber-50 text-sm"
        />

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="submit"
            className="bg-[#5B2C00] text-white py-2 px-4 rounded text-sm hover:bg-amber-900"
          >
            Save
          </button>

          <Link to="/">
            <button
              type="button"
              className="py-2 px-4 bg-orange-100 text-amber-900 rounded-md shadow text-sm hover:bg-amber-950 hover:text-orange-50 transition"
            >
              Continue to shop
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const WrappedAddressForm = SideBarLayOut(AddressForm);

export default WrappedAddressForm;
