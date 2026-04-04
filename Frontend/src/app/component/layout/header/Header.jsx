"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
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
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";

import LoginPopup from "../accountPage/signupAndLogin/Login";
import WomanPhoto from "./category/WomanCategory";
import MenPhoto from "./category/MenCategory";
import { getStoredUser, subscribeToStoredUser } from "@/lib/browser-storage";
import Logo from "../../../assets/image/Logo.webp";

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
          href: "/products?category=Women",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [{ name: "Browse All", href: "/products?category=Women" }],
        },
        {
          id: "watch",
          name: "Watch",
          items: [
            {
              name: "Browse All Women's Watch",
              href: "/products?category=Women&subCategory=Watch",
            },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            {
              name: "Browse All Women's Accessories",
              href: "/products?category=Women&subCategory=Accessories",
            },
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
          href: "/products?category=Men",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [{ name: "Browse All", href: "/products?category=Men" }],
        },
        {
          id: "watch",
          name: "Watch",
          items: [
            {
              name: "Browse All Men's Watch",
              href: "/products?category=Men&subCategory=Watch",
            },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            {
              name: "Browse All Men's Accessories",
              href: "/products?category=Men&subCategory=Accessories",
            },
          ],
        },
      ],
    },
  ],
  pages: [],
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  const cartItems = useSelector((state) => state.basket);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cartItems]);

  useEffect(() => {
    setHasMounted(true);
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    const openLogin = () => setLogin(true);
    document.addEventListener("open-login-popup", openLogin);

    return () => {
      document.removeEventListener("open-login-popup", openLogin);
    };
  }, []);

  useEffect(() => {
    const updateUser = () => setUser(getStoredUser());
    return subscribeToStoredUser(updateUser);
  }, []);

  return (
    <div className="fixed z-10 w-full bg-orange-100">
      <LoginPopup
        open={login}
        setOpen={setLogin}
        user={user}
        setUser={setUser}
      />

      {/* MOBILE MENU */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex z-40">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-orange-100 pb-12 shadow-xl border-r border-amber-950">
            <div className="px-4 pt-5 pb-2 border-b border-amber-950 flex flex-row justify-between items-center">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 text-amber-900 rounded-md border border-amber-950"
              >
                <XMarkIcon className="size-6" />
              </button>

              <div className="p-2 border border-amber-950 rounded-md bg-orange-50">
                {user ? (
                  <Link href="/account">
                    <CircleUserRound />
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false); // close sidebar
                      setTimeout(() => setLogin(true), 300); // open login popup
                    }}
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
                            href={item.href}
                            className="block mt-4 font-medium text-amber-950"
                            onClick={() => setOpen(false)}
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
                              <Link
                                href={item.href}
                                className="text-amber-900"
                                onClick={() => setOpen(false)}
                              >
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
        <p className="flex h-10 items-center justify-center bg-amber-950 px-4 text-center text-sm text-white">
          Still in progress. I am constantly updating Velora.
        </p>

        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            {/* Mobile button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 bg-orange-50 rounded-md border border-amber-950 text-amber-950"
            >
              <Bars3Icon className="size-6" />
            </button>

            {/* Logo */}
            <div className="hidden sm:block ml-4 lg:ml-0">
              <Link href="/">
                <Image
                  src={Logo}
                  width={120}
                  height={40}
                  priority
                  className="h-8 w-auto border border-amber-950 rounded-md"
                  alt="Velora Logo"
                />
              </Link>
            </div>

            {/* Desktop dropdown */}
            <PopoverGroup className="hidden lg:block lg:ml-8">
              <div className="flex h-full space-x-8">
                {/* here */}

                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    <PopoverButton className="text-sm text-amber-950 hover:text-amber-900">
                      {category.name}
                    </PopoverButton>

                    <PopoverPanel className="absolute left-0 right-0 top-full bg-orange-100 border-y border-amber-950 shadow-md z-40">
                      <div className="w-full px-8 py-10 grid grid-cols-4 gap-10">
                        {/* Featured Column */}
                        {category.featured.map((item) => (
                          <div key={item.name} className="space-y-3 col-span-1">
                            <div className="rounded-lg overflow-hidden border-2 border-amber-950">
                              {item.imageSrc}
                            </div>
                            <Link
                              href={item.href}
                              className="ml-1 font-medium text-amber-950 hover:text-amber-800 block"
                            >
                              {item.name}
                            </Link>
                          </div>
                        ))}

                        {/* Sections */}
                        <div className="col-span-3 grid grid-cols-3 gap-10">
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p className="font-medium text-amber-950">
                                {section.name}
                              </p>
                              <ul className="mt-4 space-y-4">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      className="text-amber-950 hover:text-amber-800"
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

            {/* RIGHT SIDE */}
            <div className="ml-auto flex items-center">
              {/* User (desktop) */}
              <div className="hidden lg:flex items-center space-x-6">
                {user ? (
                  <Link href="/account">
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
              <Link href="/order" className="ml-4 flex items-center">
                <ShoppingBagIcon className="size-6 text-amber-950" />
                {hasMounted && (
                  <span className="ml-2 text-sm text-gray-700">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
