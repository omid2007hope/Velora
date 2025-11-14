"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import LoginPopup from "../SignUpAndLogIn/Login";
import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

import SearchBar from "../../ProductList/SearchBar";
import WomanPhoto from "./WomanPhoto";
import MenPhoto from "./MenPhoto";
import Logo from "../../../assets/Images/Logo.png";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "Woman",
          imageSrc: <WomanPhoto />,
          imageAlt: "Women collection",
          href: "/ProductListPage?category=Women",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Browse All", href: "/ProductListPage?category=Women" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "Men",
          imageSrc: <MenPhoto />,
          imageAlt: "Men collection",
          href: "/ProductListPage?category=Men",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Browse All", href: "/ProductListPage?category=Men" },
          ],
        },
      ],
    },
  ],
  pages: [],
};

export default function Header() {
  const loadUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(loadUser);

  return (
    <div className="fixed z-10 w-full bg-orange-100">
      <LoginPopup
        open={login}
        setOpen={setLogin}
        user={user}
        setUser={setUser}
      />

      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex z-40">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-orange-100 pb-12 shadow-xl border-r border-amber-950">
            <div className="px-4 pt-5 pb-2 border-b border-amber-950 flex flex-row justify-between items-center">
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-amber-900 rounded-md border border-amber-950"
              >
                <XMarkIcon className="size-6" />
              </button>

              <div className="p-2 border border-amber-950 rounded-md bg-orange-50">
                {user ? (
                  <Link to="/AccountPage">
                    <CircleUserRound />
                  </Link>
                ) : (
                  <button
                    onClick={() => setLogin(true)}
                    className="text-sm text-amber-950"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>

            {/* Mobile navigation */}
            <TabGroup className="mt-2">
              <TabList className="flex space-x-8 px-4 border-b border-amber-950">
                {navigation.categories.map((category) => (
                  <Tab
                    key={category.name}
                    className="flex-1 px-1 py-4 text-base text-amber-950 border-b-2 border-transparent data-selected:border-amber-950"
                  >
                    {category.name}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="px-4 pt-10 pb-8 space-y-10"
                  >
                    {/* Featured */}
                    <div className="grid grid-cols-1 gap-6">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <div className="aspect-square w-full rounded-lg border-2 border-amber-950 overflow-hidden">
                            {item.imageSrc}
                          </div>

                          <Link
                            to={item.href}
                            className="block mt-4 font-medium text-amber-950"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Sections */}
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="font-medium text-amber-950">
                          {section.name}
                        </p>
                        <ul className="mt-6 space-y-4">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <Link to={item.href} className="text-amber-900">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </DialogPanel>
        </div>
      </Dialog>

      {/* DESKTOP HEADER */}
      <header className="relative bg-orange-200 border-b border-amber-950">
        <p className="flex h-10 items-center justify-center bg-amber-950 text-white text-sm">
          Free delivery for orders over 50$
        </p>

        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            {/* Mobile button */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 bg-orange-50 rounded-md border border-amber-950 text-amber-950"
            >
              <Bars3Icon className="size-6" />
            </button>

            {/* Logo */}
            <div className="hidden sm:block ml-4 lg:ml-0">
              <Link to="/">
                <img
                  src={Logo}
                  className="h-8 w-auto border border-amber-950 rounded-md"
                />
              </Link>
            </div>

            {/* Desktop dropdown */}
            <PopoverGroup className="hidden lg:block lg:ml-8">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    <PopoverButton className="text-sm text-amber-950 hover:text-amber-900">
                      {category.name}
                    </PopoverButton>

                    <PopoverPanel className="absolute inset-x-0 top-full bg-orange-100 border-y border-amber-950 shadow-md">
                      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 gap-8">
                        <div className="col-start-2 grid grid-cols-2 gap-8">
                          {category.featured.map((item) => (
                            <div key={item.name}>
                              <div className="w-240 rounded-lg overflow-hidden border-2 border-amber-950">
                                {item.imageSrc}
                              </div>

                              <Link
                                to={item.href}
                                className="block mt-4 font-medium text-amber-950"
                              >
                                {item.name}
                              </Link>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p className="font-medium text-amber-950">
                                {section.name}
                              </p>
                              <ul className="mt-4 space-y-4">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      to={item.href}
                                      className="text-amber-950 hover:text-amber-900"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverPanel>
                  </Popover>
                ))}
              </div>
            </PopoverGroup>

            {/* Search (mobile only) */}
            <div className="visible md:hidden lg:hidden flex-grow">
              <SearchBar />
            </div>

            {/* RIGHT SIDE */}
            <div className="ml-auto flex items-center">
              {/* User */}
              <div className="hidden lg:flex items-center space-x-6">
                {user ? (
                  <Link to="/AccountPage">
                    <CircleUserRound className="text-amber-950" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setLogin(true)}
                    className="text-sm text-amber-950"
                  >
                    Sign in
                  </button>
                )}

                <span className="h-6 w-px bg-gray-300" />
              </div>

              {/* Cart */}
              <Link to="/Order" className="ml-4 flex items-center">
                <ShoppingBagIcon className="size-6 text-amber-950" />
                <span className="ml-2 text-sm text-gray-700">0</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
