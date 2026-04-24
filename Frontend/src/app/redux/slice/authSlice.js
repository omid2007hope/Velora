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
