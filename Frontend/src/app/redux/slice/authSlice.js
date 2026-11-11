/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    storeOwner: null,
    hydrated: false,
    loginPopupOpen: false,
    sellerPopupOpen: false,
  },
  reducers: {
    // Called once on client mount to hydrate from localStorage
    hydrateAuth: (state, action) => {
      state.user = action.payload.user;
      state.storeOwner = action.payload.storeOwner;
      state.hydrated = true;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setStoreOwner: (state, action) => {
      state.storeOwner = action.payload;
    },

    clearAuth: (state) => {
      state.user = null;
      state.storeOwner = null;
    },

    openLoginPopup: (state) => {
      state.loginPopupOpen = true;
    },

    closeLoginPopup: (state) => {
      state.loginPopupOpen = false;
    },

    openSellerPopup: (state) => {
      state.sellerPopupOpen = true;
    },

    closeSellerPopup: (state) => {
      state.sellerPopupOpen = false;
    },
  },
});

export const {
  hydrateAuth,
  setUser,
  setStoreOwner,
  clearAuth,
  openLoginPopup,
  closeLoginPopup,
  openSellerPopup,
  closeSellerPopup,
} = authSlice.actions;

export default authSlice.reducer;
