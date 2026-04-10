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
import { usePathname, useSearchParams } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";
import LoginPopup from "@/app/features/auth/components/LoginPopup";
import MenCategory from "@/app/components/layout/header/category/MenCategory";
import WomanCategory from "@/app/components/layout/header/category/WomanCategory";
import { catalogNavigation } from "@/app/constants/catalog-navigation";
import {
  getStoredUser,
  subscribeToStoredUser,
} from "@/app/lib/browser-storage";
import Logo from "@/app/assets/image/Logo.webp";

const featuredPreviewByCategory = {
  women: <WomanCategory />,
  men: <MenCategory />,
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  return (
    <div className="fixed z-10 w-full bg-orange-100">
      <LoginPopup
        open={login}
        setOpen={setLogin}
        user={user}
        setUser={setUser}
      />

      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto border-r border-amber-950 bg-orange-100 pb-12 shadow-xl">
            <div className="flex flex-row items-center justify-between border-b border-amber-950 px-4 pb-2 pt-5">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-md border border-amber-950 p-2 text-amber-900"
              >
                <XMarkIcon className="size-6" />
              </button>

              <div className="rounded-md border border-amber-950 bg-orange-50 p-2">
                {user ? (
                  <Link href="/account">
                    <CircleUserRound />
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => setLogin(true), 300);
                    }}
                    className="text-sm text-amber-950"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>

            <TabGroup className="mt-2">
              <TabList className="flex space-x-8 border-b border-amber-950 px-4">
                {catalogNavigation.map((category) => (
                  <Tab
                    key={category.name}
                    className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-bold text-amber-950 data-selected:border-amber-950"
                  >
                    {category.name}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                {catalogNavigation.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-1 gap-6">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <div className="aspect-square w-full overflow-hidden rounded-lg border-2 border-amber-950">
                            {featuredPreviewByCategory[category.id]}
                          </div>

                          <Link
                            href={item.href}
                            className="mt-4 block font-medium text-amber-950"
                            onClick={() => setOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="text-base font-bold text-amber-950">
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
                                {item.name.startsWith("Browse All") ? (
                                  <>
                                    <span className="font-medium">
                                      Browse All
                                    </span>
                                    <span className="font-normal">
                                      {item.name.slice("Browse All".length)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-normal">
                                    {item.name}
                                  </span>
                                )}
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

      <header className="relative border-b border-amber-950 bg-orange-200">
        <p className="flex h-10 items-center justify-center bg-amber-950 px-4 text-center text-sm text-white">
          Still in progress. I am constantly updating Velora.
        </p>

        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-md border border-amber-950 bg-orange-50 p-2 text-amber-950 lg:hidden"
            >
              <Bars3Icon className="size-6" />
            </button>

            <div className="ml-4 hidden sm:block lg:ml-0">
              <Link href="/">
                <Image
                  src={Logo}
                  width={120}
                  height={40}
                  priority
                  className="h-8 w-auto rounded-md border border-amber-950"
                  alt="Velora Logo"
                />
              </Link>
            </div>

            <PopoverGroup
              key={`${pathname}?${searchParams.toString()}`}
              className="hidden lg:ml-8 lg:block"
            >
              <div className="flex h-full space-x-8">
                {catalogNavigation.map((category) => (
                  <Popover key={category.name} className="flex">
                    <PopoverButton className="text-sm font-bold text-amber-950 hover:text-amber-900">
                      {category.name}
                    </PopoverButton>

                    <PopoverPanel className="absolute left-0 right-0 top-full z-40 border-y border-amber-950 bg-orange-100 shadow-md">
                      <div className="grid w-full grid-cols-4 gap-10 px-8 py-10">
                        {category.featured.map((item) => (
                          <div key={item.name} className="col-span-1 space-y-3">
                            <div className="overflow-hidden rounded-lg border-2 border-amber-950">
                              {featuredPreviewByCategory[category.id]}
                            </div>
                            <Link
                              href={item.href}
                              className="ml-1 block font-medium text-amber-950 hover:text-amber-800"
                            >
                              {item.name}
                            </Link>
                          </div>
                        ))}

                        <div className="col-span-3 grid grid-cols-3 gap-10">
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p className="text-base font-bold text-amber-950">
                                {section.name}
                              </p>
                              <ul className="mt-4 space-y-4">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      className="text-amber-950 hover:text-amber-800"
                                    >
                                      {item.name.startsWith("Browse All") ? (
                                        <>
                                          <span className="font-medium">
                                            Browse All
                                          </span>
                                          <span className="font-normal">
                                            {item.name.slice(
                                              "Browse All".length,
                                            )}
                                          </span>
                                        </>
                                      ) : (
                                        <span className="font-normal">
                                          {item.name}
                                        </span>
                                      )}
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

            <div className="ml-auto flex items-center">
              <div className="hidden items-center space-x-6 lg:flex ">
                <button className="text-sm text-amber-950 hover:text-orange-100 active:text-amber-950 border border-amber-950 rounded-lg px-4 py-2 bg-orange-100 hover:bg-orange-950 avtive:bg-orange-100 transition-colors duration-300 ease-in-out">
                  Sell panel
                </button>
                {user ? (
                  <Link href="/account">
                    <CircleUserRound className="text-amber-950" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setLogin(true)}
                    className="text-sm text-amber-950 hover:text-orange-100 active:text-amber-950 border border-amber-950 rounded-lg px-4 py-2 bg-orange-100 hover:bg-orange-950 avtive:bg-orange-100 transition-colors duration-300 ease-in-out"
                  >
                    Sign in
                  </button>
                )}
                <span className="h-6 w-px bg-amber-950" />
              </div>

              <Link href="/order" className="ml-4 flex items-center">
                <ShoppingBagIcon className="size-6 text-amber-950" />
                {hasMounted ? (
                  <span className="ml-2 text-sm text-gray-700">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
