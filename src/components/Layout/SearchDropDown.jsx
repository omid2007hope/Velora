import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchDropDown() {
  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center px-3 py-2 ">
        <MagnifyingGlassIcon className="h-6 w-6 text-amber-950 hover:text-amber-800" />
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 sm:right-0 lg:right-0 top-12 z-10"
      >
        <div className="flex items-center mt-3 py-1.5 sm:py-3 lg:py-3 bg-orange-200 rounded-lg border-2 border-amber-950">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            className="block bg-orange-100 rounded-tl-lg rounded-bl-lg border-b-2 border-t-2 border-l-2 border-amber-950 ml-2 py-2.5 sm:py-3 lg:py-3 pr-7 sm:pr-14 lg:pr-14 pl-2 text-amber-950 "
          />
          <button
            type="button"
            className="rounded-tr-lg rounded-br-lg border-t-2 border-b-2 border-r-2 border-amber-950 bg-amber-950 hover:bg-amber-800 active:bg-amber-950 transition transition-3 px-3 py-2.5 sm:py-3 lg:py-3 mr-2"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-orange-50" />
          </button>
        </div>
      </MenuItems>
    </Menu>
  );
}
