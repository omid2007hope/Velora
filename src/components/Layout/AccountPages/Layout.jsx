import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserIcon, Menu, X } from "lucide-react";
import SignOutForm from "./SignOutForm";

function SideBarLayOut(WrappedComponent) {
  const HOC = (props) => {
    const [openSignOut, setOpenSignOut] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      try {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }, []);

    const links = [
      { name: "Personal Information", to: "/account" },
      { name: "Addresses", to: "/account/address" },
      { name: "Payment Methods", to: "/account/payment" },
    ];

    const navLinks = (onClickExtra) => (
      <>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            end
            onClick={onClickExtra}
            className={({ isActive }) =>
              [
                "block w-full text-left px-3 py-2 rounded-md border-b border-l border-amber-950 shadow-md shadow-amber-950 text-sm transition",
                isActive
                  ? "bg-amber-950 text-white font-semibold"
                  : "text-amber-950 hover:text-white hover:bg-amber-950",
              ].join(" ")
            }
          >
            {link.name}
          </NavLink>
        ))}

        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setOpenSignOut(true);
          }}
          className="w-full mt-3 text-left text-red-500 font-semibold text-sm hover:text-red-500/70"
        >
          Sign Out
        </button>
      </>
    );

    return (
      <div className="min-h-screen bg-orange-50 flex flex-col pt-8">
        {/* MOBILE TOP BAR */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-amber-950 bg-orange-100 md:hidden">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center h-10 w-10 rounded-full bg-orange-50 border border-amber-950">
              <UserIcon className="h-6 w-6 text-amber-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-amber-800">Account</span>
              <span className="text-sm font-semibold text-amber-950 truncate max-w-[140px]">
                {user?.fullName || "Your profile"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="p-2 rounded-md border border-amber-950 bg-orange-50 text-amber-950"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN SIDEBAR */}
        <div
          className={`md:hidden overflow-hidden border-b border-amber-950 bg-orange-100 transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-2">
            {navLinks(() => setMobileMenuOpen(false))}
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="flex flex-1">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:flex md:flex-col md:w-64 md:min-h-screen bg-orange-50 border-r border-amber-950 shadow-md shadow-amber-950">
            <div className="flex flex-col items-center py-6 border-b border-amber-950">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-orange-100 border border-amber-950">
                <UserIcon className="h-8 w-8 text-amber-950" />
              </div>
              <h2 className="mt-3 font-semibold text-amber-950 text-sm">
                {user?.fullName || "Your profile"}
              </h2>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">{navLinks()}</nav>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 flex justify-center items-start px-4 md:px-8 py-8">
            <WrappedComponent {...props} />
          </main>
        </div>

        <SignOutForm open={openSignOut} setOpen={setOpenSignOut} />
      </div>
    );
  };

  HOC.displayName = `WithMenuLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return HOC;
}

export default SideBarLayOut;
