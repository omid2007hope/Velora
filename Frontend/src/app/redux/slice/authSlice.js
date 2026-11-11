// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
