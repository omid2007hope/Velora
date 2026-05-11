"use client";

import { createContext, useContext } from "react";

export const SellerNavContext = createContext({ refreshNav: () => {} });

export const useSellerNav = () => useContext(SellerNavContext);
