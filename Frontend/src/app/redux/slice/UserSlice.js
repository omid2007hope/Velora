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

const initialState = {
  id: null,
  fullName: "",
  email: "",
  picture: null,
  google: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    hydrateUser: (state, action) => {
      const user = action.payload || null;
      state.id = user?._id || null;
      state.fullName = user?.fullName || user?.name || "";
      state.email = user?.email || "";
      state.picture = user?.picture || null;
      state.google = user?.google ?? false;
    },
    setUserProfile: (state, action) => {
      const user = action.payload || null;
      state.id = user?._id || null;
      state.fullName = user?.fullName || user?.name || "";
      state.email = user?.email || "";
      state.picture = user?.picture || null;
      state.google = user?.google ?? false;
    },
    clearUserProfile: (state) => {
      state.id = null;
      state.fullName = "";
      state.email = "";
      state.picture = null;
      state.google = false;
    },
  },
});

export const { hydrateUser, setUserProfile, clearUserProfile } =
  userSlice.actions;

export default userSlice.reducer;