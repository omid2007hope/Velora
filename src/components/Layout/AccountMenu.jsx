import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function AccountMenu({ setUser }) {
  const getUserName = JSON.parse(localStorage.getItem("user")) || {};
  const [userName, setUserName] = useState(getUserName);

  function signout() {
    localStorage.removeItem("user");
    setUserName(null); // clear local state
    setUser(null); // 🔑 tells Header to hide AccountMenu
  }

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
        {userName?.fullName || "Account"}
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 size-5 text-gray-400"
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              onClick={signout}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100"
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
