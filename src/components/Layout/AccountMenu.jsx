import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import AccountPage from "../../Page/AccountPage";
import { Link } from "react-router-dom";

export default function AccountMenu(props) {
  function signout() {
    localStorage.removeItem("user");
    props.setUser(null);
  }

  return (
    <Menu as="div" className="relative inline-block">
      {/* Button */}
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md border-2 border-amber-950 bg-orange-100 px-4 py-2 text-sm font-semibold text-amber-950 shadow-sm hover:bg-orange-200 transition">
        {props?.user?.fullName || props?.user?.name || "Account"}
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 size-5 text-amber-800"
        />
      </MenuButton>

      {/* Dropdown */}
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl border border-amber-900 bg-orange-50 shadow-lg ring-1 ring-amber-950/20 focus:outline-none data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-leave:duration-100"
      >
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <Link
                to="/AccountPage"
                className={`block px-4 py-2 text-sm font-medium ${
                  focus
                    ? "bg-amber-950 text-orange-50"
                    : "text-amber-900 hover:bg-orange-200"
                }`}
              >
                Account settings
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                type="button"
                onClick={signout}
                className={`block w-full px-4 py-2 text-left text-sm font-medium ${
                  focus
                    ? "bg-amber-950 text-orange-50"
                    : "text-amber-900 hover:bg-orange-200"
                }`}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
