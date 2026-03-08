// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon, Menu, X } from "lucide-react";
import SignOutForm from "./Signout";

const ACCOUNT_LINKS = [
  { name: "Personal Information", to: "/account" },
  { name: "Addresses", to: "/account/address" },
  { name: "Payment Methods", to: "/account/payment" },
];

function SideBarLayOut(WrappedComponent) {
  const HOC = (props) => {
    const [openSignOut, setOpenSignOut] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
      const updateUser = () => {
        try {
          const stored = localStorage.getItem("user");
          if (!stored) {
            setUser(null);
            return;
          }

          const parsed = JSON.parse(stored);
          setUser(parsed);
        } catch {
          setUser(null);
        }
      };

      updateUser();
      window.addEventListener("user-updated", updateUser);

      return () => {
        window.removeEventListener("user-updated", updateUser);
      };
    }, []);

    const renderNavLinks = (onClickExtra) => (
      <>
        {ACCOUNT_LINKS.map((link) => {
          const active = pathname === link.to;

          return (
            <Link
              key={link.name}
              href={link.to}
              onClick={onClickExtra}
              className={`block w-full rounded-md border-b border-l border-amber-950 px-3 py-2 text-left text-sm shadow-md shadow-amber-950 transition ${
                active
                  ? "bg-amber-950 font-semibold text-white"
                  : "text-amber-950 hover:bg-amber-950 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}

        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setOpenSignOut(true);
          }}
          className="w-full text-left text-red-500 font-semibold text-sm hover:text-red-500/70"
        >
          Sign Out
        </button>
      </>
    );

    return (
      <div className="min-h-screen bg-orange-50 flex flex-col pt-0">
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
            aria-expanded={mobileMenuOpen}
            aria-controls="account-mobile-menu"
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
          id="account-mobile-menu"
          className={`md:hidden overflow-hidden border-b border-amber-950 bg-orange-100 transition-all duration-300 will-change-[max-height,opacity] ${
            mobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-2">
            {renderNavLinks(() => setMobileMenuOpen(false))}
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

            <nav className="flex-1 px-4 py-4 space-y-2">{renderNavLinks()}</nav>
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
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"
  })`;

  return HOC;
}

export default SideBarLayOut;
