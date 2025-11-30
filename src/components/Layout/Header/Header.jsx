"use client";

import { useEffect, useState } from "react";
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

import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";

import LoginPopup from "../SignUpAndLogIn/Login";
import WomanPhoto from "./WomanPhoto";
import MenPhoto from "./MenPhoto";
import Logo from "../../../assets/Images/Logo.png";

import * as categoryAPI from "../../../API/Category";

// const navigation = {
//   categories: [
//     {
//       id: "women",
//       name: "Women",
//       featured: [
//         {
//           name: "Woman",
//           imageSrc: <WomanPhoto />,
//           imageAlt: "Women collection",
//           href: "/ProductListPage?category=Women",
//         },
//       ],
//       sections: [
//         {
//           id: "clothing",
//           name: "Clothing",
//           items: [
//             { name: "Browse All", href: "/ProductListPage?category=Women" },
//           ],
//         },
//       ],
//     },
//     {
//       id: "men",
//       name: "Men",
//       featured: [
//         {
//           name: "Men",
//           imageSrc: <MenPhoto />,
//           imageAlt: "Men collection",
//           href: "/ProductListPage?category=Men",
//         },
//       ],
//       sections: [
//         {
//           id: "clothing",
//           name: "Clothing",
//           items: [
//             { name: "Browse All", href: "/ProductListPage?category=Men" },
//           ],
//         },
//       ],
//     },
//   ],
//   pages: [],
// };

export default function Header() {
  const [open, setOpen] = useState(false);
  const loadUser = JSON.parse(localStorage.getItem("user"));

  const openLoginForm = !loadUser ? true : false;

  const [login, setLogin] = useState(openLoginForm || false);

  const [user, setUser] = useState(loadUser ? loadUser : null);

  const [category, setCategory] = useState([]);

  const cartItems = useSelector((state) => state.list) || [];

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  // Listen for "open-login-popup" (from Signup) and open Login
  useEffect(() => {
    const handleOpenLogin = () => setLogin(true);
    document.addEventListener("open-login-popup", handleOpenLogin);

    return () => {
      document.removeEventListener("open-login-popup", handleOpenLogin);
    };
  }, []);

  // Sync user state if localStorage user changes (login/logout in other parts)
  useEffect(() => {
    const updateUser = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user"));
        setUser(stored);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", updateUser);
    window.addEventListener("user-updated", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("user-updated", updateUser);
    };
  }, []);

  const getAllCategory = async () => {
    try {
      const { data, status } = await categoryAPI.GetAllCategoryTree();

      if (status !== 200) return;

      setCategory(data.data);

      // console.log(data.data, status);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllCategory();
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
                {category.map((cat) => (
                  <Tab
                    key={cat.id}
                    className="flex-1 px-1 py-4 text-base text-amber-950 border-b-2 border-transparent data-selected:border-amber-950"
                  >
                    {cat.name}
                  </Tab>
                ))}
              </TabList>

              {!category || !category.length ? (
                ""
              ) : (
                <TabPanels>
                  {category.map((cat) => (
                    <TabPanel
                      key={cat.name}
                      className="px-4 pt-10 pb-8 space-y-10"
                    >
                      {/* Featured */}
                      <div className="grid grid-cols-1 gap-6">
                        {!cat.child || !cat.child.length
                          ? ""
                          : cat.child.map((item) => (
                              <div key={item.name} className="group relative">
                                <div className="aspect-square w-full rounded-lg border-2 border-amber-950 overflow-hidden">
                                  {item.imageSrc}
                                </div>

                                <Link
                                  to={item.href}
                                  className="block mt-4 font-medium text-amber-950"
                                  onClick={() => setOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </div>
                            ))}
                      </div>
                      {/* {!cat.child || !cat.child.length ? (
                        ""
                      ) : (
                        <div key={section.id}>
                          <p className="font-medium text-amber-950">
                            {section.name}
                          </p>
                          <ul className="mt-6 space-y-4">
                            {section.child.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className="text-amber-900"
                                  onClick={() => setOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )} */}
                    </TabPanel>
                  ))}
                </TabPanels>
              )}
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
                  alt="Logo"
                />
              </Link>
            </div>
            {useEffect(() => {
              console.log(category);
            }, [category])}
            <PopoverGroup className="hidden lg:block lg:ml-8">
              {/* Only render when categories exist */}
              {category?.length > 0 && (
                <div className="flex h-full space-x-8">
                  {category.map((cat) => (
                    <Popover key={cat.name} className="flex">
                      {/* Category button */}
                      <PopoverButton className="text-sm text-amber-950 hover:text-amber-900">
                        {cat.name}
                      </PopoverButton>

                      {/* Dropdown panel for the category */}
                      <PopoverPanel className="absolute left-0 right-0 top-full w-full bg-orange-100 border-y border-amber-950 shadow-md z-40 ">
                        <div className="w-full px-10 py-10 gap-10 flex flex-row justify-between items-center">
                          {/* Main grid: iterate over direct children of the category */}
                          <ul className="w-full h-full flex flex-row items-center justify-between">
                            {cat.child?.map((child) => (
                              <li
                                key={child.id}
                                className="space-y-3 w-full h-full flex flex-row items-start justify-between"
                              >
                                {/* Left: image area */}
                                <div className="w-1/2 h-full rounded-lg overflow-hidden border-2 border-amber-950">
                                  <WomanPhoto images={cat.images} />
                                </div>

                                {/* Right: child link and its sections */}
                                <div className="w-1/2 ml-5 h-full flex flex-col justify-start items-center">
                                  {/* Child link */}
                                  <Link
                                    to={child.href}
                                    className="font-medium mb-2.5 text-amber-950 hover:text-amber-800 block w-full h-full flex-row justify-center items-center"
                                  >
                                    {child.name}
                                  </Link>

                                  {/* Sections under the child */}
                                  <ul className="space-y-2 w-full h-full flex-row justify-center items-center ">
                                    {child.child?.map((section) => (
                                      <li
                                        key={section.id}
                                        className="text-amber-950 hover:text-amber-80"
                                      >
                                        <p className="text-md text-amber-950/50 ">
                                          {section.name}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}
                </div>
              )}
            </PopoverGroup>
            {/* RIGHT SIDE */}
            <div className="ml-auto flex items-center">
              {/* User (desktop) */}
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
                <span className="ml-2 text-sm text-gray-700">{cartCount}</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
