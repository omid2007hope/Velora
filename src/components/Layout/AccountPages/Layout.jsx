import { useState } from "react";
import { UserIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import SignOutForm from "./SignOutForm";

function SideBarLayOut(WrappedComponent) {
  const HOC = (props) => {
    const loadYourUser = JSON.parse(localStorage.getItem("user"));
    const [open, setOpen] = useState(false);

    const links = [
      { name: "Personal Information", to: "/AccountPage" },
      { name: "Addresses", to: "/AccountPage/AddressForm" },
      { name: "Payment Methods", to: "/AccountPage/PaymentForm" },
    ];

    return (
      <div className="min-h-screen bg-orange-50 flex flex-col md:flex-row lg:flex-row ">
        {/* Sidebar */}
        <div className="fixed z-250 w-full md:w-64 lg:w-64 h-53/100 md:h-screen lg:h-screen bg-orange-50 md:flex flex-col border-r border-amber-950 shadow-md shadow-amber-950">
          <div className="w-full flex flex-row md:flex-col lg:flex-col justify-evenly items-center py-6 border-amber-950">
            <div className="flex justify-center items-center h-16 w-16 rounded-full bg-orange-100 border border-amber-950">
              <UserIcon className="h-8 w-8 text-amber-950" />
            </div>
            <h2 className="mt-2 font-semibold text-amber-950">
              {loadYourUser?.fullName}
            </h2>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-2 rounded-md mt-2.5 border-b-2 border-l-2 border-amber-950 shadow-md shadow-amber-950 transition ${
                    isActive
                      ? "bg-amber-950 text-white font-semibold"
                      : "text-amber-950 hover:text-white hover:bg-amber-950"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="px-4 py-4">
            <button
              onClick={() => setOpen(true)}
              className="w-full text-left text-red-500 font-bold hover:text-red-500/50 active:text-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full h-full flex flex-col justify-center items-center ml-0 md:ml-60 lg:ml-60">
          <WrappedComponent {...props} />
          <SignOutForm open={open} setOpen={setOpen} />
        </div>
      </div>
    );
  };

  HOC.displayName = `WithMenuLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return HOC;
}

export default SideBarLayOut;
