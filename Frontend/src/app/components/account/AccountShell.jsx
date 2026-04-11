"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UserIcon, X } from "lucide-react";
import SignOutDialog from "@/app/features/account/components/SignOutDialog";
import { accountLinks } from "@/app/features/account/constants/account-links";
import {
  getStoredUser,
  subscribeToStorageChanges,
} from "@/app/lib/browser-storage";

export default function AccountShell({ children }) {
  const [openSignOut, setOpenSignOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateUser = () => setUser(getStoredUser());

    updateUser();
    return subscribeToStorageChanges(updateUser);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-orange-50 pt-0">
      <div className="flex items-center justify-between border-b border-amber-950 bg-orange-100 px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-950 bg-orange-50">
            <UserIcon className="h-6 w-6 text-amber-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-amber-800">Account</span>
            <span className="max-w-[140px] truncate text-sm font-semibold text-amber-950">
              {user?.fullName || "Your profile"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="account-mobile-menu"
          className="rounded-md border border-amber-950 bg-orange-50 p-2 text-amber-950"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        id="account-mobile-menu"
        className={`overflow-hidden border-b border-amber-950 bg-orange-100 transition-all duration-300 will-change-[max-height,opacity] md:hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="space-y-2 px-4 py-3">
          {accountLinks.map((link) => {
            const active = pathname === link.to;

            return (
              <Link
                key={link.name}
                href={link.to}
                onClick={() => setMobileMenuOpen(false)}
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
            className="w-full text-left text-sm font-semibold text-red-500 hover:text-red-400"
          >
            Sign Out
          </button>
        </nav>
      </div>

      <div className="flex flex-1">
        <aside className="hidden min-h-screen w-64 flex-col border-r border-amber-950 bg-orange-50 shadow-md shadow-amber-950 md:flex">
          <div className="flex flex-col items-center border-b border-amber-950 py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-950 bg-orange-100">
              <UserIcon className="h-8 w-8 text-amber-950" />
            </div>
            <h2 className="mt-3 text-sm font-semibold text-amber-950">
              {user?.fullName || "Your profile"}
            </h2>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-4">
            {accountLinks.map((link) => {
              const active = pathname === link.to;

              return (
                <Link
                  key={link.name}
                  href={link.to}
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
              onClick={() => setOpenSignOut(true)}
              className="w-full text-left text-sm font-semibold text-red-500 hover:text-red-400"
            >
              Sign Out
            </button>
          </nav>
        </aside>

        <main className="flex flex-1 items-start justify-center px-4 py-8 md:px-8">
          {children}
        </main>
      </div>

      <SignOutDialog open={openSignOut} setOpen={setOpenSignOut} />
    </div>
  );
}
