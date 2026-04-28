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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleUserRound, Store } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import LoginPopup from "@/app/features/auth/components/LoginPopup";
import CategoryCarousel from "@/app/components/layout/header/category/CategoryCarousel";
import { featuredPreviewImages } from "@/app/components/layout/header/category/featured-preview-images";
import { catalogNavigation } from "@/app/constants/catalog-navigation";
import {
  getStoredBasket,
  getStoredStoreOwner,
  getStoredUser,
} from "@/app/lib/browser-storage";
import Logo from "@/app/assets/image/Logo.webp";
import LogIntoSellerPanelPopup from "@/app/features/auth/components/LogIntoSellerPanelPopup";
import {
  hydrateAuth,
  openLoginPopup,
  openSellerPopup,
} from "@/app/redux/slice/authSlice";
import { hydrateBasket } from "@/app/redux/slice/BasketSlice";
import { hydrateUser } from "@/app/redux/slice/UserSlice";
import { hydrateStoreOwner } from "@/app/redux/slice/StoreOwnerSlice";

const featuredPreviewByCategory = {
  women: <CategoryCarousel images={featuredPreviewImages.women} />,
  men: <CategoryCarousel images={featuredPreviewImages.men} />,
};

const actionButtonClass =
  "inline-flex items-center justify-center rounded-full border border-amber-950/90 bg-gradient-to-b from-orange-50 to-orange-200 px-4 py-2 text-sm font-semibold tracking-[0.02em] text-amber-950 shadow-[0_8px_24px_rgba(120,53,15,0.12)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-950 hover:text-orange-50 hover:shadow-[0_14px_28px_rgba(120,53,15,0.18)] active:translate-y-0";

const sellerPanelClass =
  "inline-flex min-h-12 min-w-[9.5rem] flex-col items-center justify-center rounded-2xl border border-amber-950/90 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 px-4 py-2 text-amber-950 shadow-[0_10px_28px_rgba(120,53,15,0.14)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-amber-950 hover:via-amber-900 hover:to-amber-800 hover:text-orange-50 hover:shadow-[0_16px_32px_rgba(120,53,15,0.18)] active:translate-y-0";

const accountLinkClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-amber-950/80 bg-gradient-to-b from-orange-50 to-orange-200 text-amber-950 shadow-[0_8px_22px_rgba(120,53,15,0.12)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-950 hover:text-orange-50 hover:shadow-[0_14px_28px_rgba(120,53,15,0.18)] active:translate-y-0";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.basket);
  const user = useSelector((state) => state.auth.user);
  const storeOwner = useSelector((state) => state.auth.storeOwner);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cartItems]);

  // Hydrate auth state from localStorage once on the client
  useEffect(() => {
    const userData = getStoredUser();
    const storeOwnerData = getStoredStoreOwner();

    dispatch(
      hydrateAuth({
        user: userData,
        storeOwner: storeOwnerData,
      }),
    );
    dispatch(hydrateUser(userData));
    dispatch(hydrateStoreOwner(storeOwnerData));
    dispatch(hydrateBasket(getStoredBasket()));
    setHasMounted(true);
  }, [dispatch]);

  // Open login popup when ?auth=login query param is present
  useEffect(() => {
    if (searchParams.get("auth") === "login") {
      dispatch(openLoginPopup());

      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete("auth");
      const nextQuery = nextSearchParams.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }
  }, [pathname, router, searchParams, dispatch]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  return (
    <div className="fixed z-10 w-full bg-orange-100">
      <LoginPopup />

      <LogIntoSellerPanelPopup />

      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto border-r border-amber-950 bg-orange-100 pb-12 shadow-xl">
            <div className="flex flex-row items-center justify-between gap-3 border-b border-amber-950 px-4 pb-3 pt-5">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-xl border border-amber-950 bg-orange-50 p-2 text-amber-900 shadow-sm transition-colors duration-300 hover:bg-amber-950 hover:text-orange-50"
              >
                <XMarkIcon className="size-6" />
              </button>

              <div className="flex w-auto flex-1 justify-center lg:hidden">
                {user ? null : !storeOwner ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => dispatch(openSellerPopup()), 300);
                    }}
                    className={actionButtonClass}
                  >
                    Sell on Velora
                  </button>
                ) : (
                  <Link href="/seller" className={sellerPanelClass}>
                    <div className="flex w-full items-center justify-center text-[11px] font-medium uppercase tracking-[0.22em]">
                      Sell on
                    </div>
                    <div className="mt-1 flex w-full items-center justify-center text-sm font-bold">
                      Velora
                      <span className="ml-1 flex flex-row items-center justify-end">
                        <Store className="size-4" />
                      </span>
                    </div>
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-end lg:hidden">
                {storeOwner ? null : user ? (
                  <Link href="/account" className={accountLinkClass}>
                    <CircleUserRound className="size-5" />
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => dispatch(openLoginPopup()), 300);
                    }}
                    className={actionButtonClass}
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
        <p className="flex min-h-10 flex-wrap items-center justify-center gap-x-2 gap-y-1 border-b-2 border-amber-950 bg-amber-950 px-4 py-2 text-center text-xs font-medium text-orange-50">
          <span className="rounded border border-orange-200/40 bg-orange-50/10 px-2 py-0.5 text-[11px] font-black uppercase tracking-widest text-orange-100">
            Demo
          </span>
          <span className="hidden sm:inline">
            Work sample only — no copyright infringement intended. Images for
            demo purposes only. Still in progress.
          </span>
          <span className="hidden sm:inline text-orange-300">·</span>
          <span>
            Built by{" "}
            <a
              href="https://omidteimory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-orange-200 underline underline-offset-2 hover:text-white"
            >
              Omid Teimory
            </a>{" "}
            © 2026 — available to hire
          </span>
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
              <div className="hidden items-center gap-4 lg:flex ">
                {user ? null : !storeOwner ? (
                  <button
                    className={actionButtonClass}
                    onClick={() => dispatch(openSellerPopup())}
                  >
                    Sell on Velora
                  </button>
                ) : (
                  <Link href="/seller" className={sellerPanelClass}>
                    <div className="flex w-full items-center justify-center text-[11px] font-medium uppercase tracking-[0.22em]">
                      Sell on
                    </div>
                    <div className="mt-1 flex w-full items-center justify-center text-sm font-bold">
                      Velora
                      <span className="ml-1 flex flex-row items-center justify-end">
                        <Store className="size-4" />
                      </span>
                    </div>
                  </Link>
                )}

                {storeOwner ? null : user ? (
                  <Link href="/account" className={accountLinkClass}>
                    <CircleUserRound className="size-5" />
                  </Link>
                ) : (
                  <button
                    onClick={() => dispatch(openLoginPopup())}
                    className={actionButtonClass}
                  >
                    Sign in
                  </button>
                )}
                <span className="h-8 w-px bg-gradient-to-b from-transparent via-amber-950 to-transparent" />
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
