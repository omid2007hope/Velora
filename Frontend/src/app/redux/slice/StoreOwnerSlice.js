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

const initialState = {
  id: null,
  fullName: "",
  email: "",
  picture: null,
  google: false,
};

const storeOwnerSlice = createSlice({
  name: "storeOwnerProfile",
  initialState,
  reducers: {
    hydrateStoreOwner: (state, action) => {
      const owner = action.payload || null;
      state.id = owner?._id || null;
      state.fullName = owner?.fullName || owner?.name || "";
      state.email = owner?.email || "";
      state.picture = owner?.picture || null;
      state.google = owner?.google ?? false;
    },
    setStoreOwnerProfile: (state, action) => {
      const owner = action.payload || null;
      state.id = owner?._id || null;
      state.fullName = owner?.fullName || owner?.name || "";
      state.email = owner?.email || "";
      state.picture = owner?.picture || null;
      state.google = owner?.google ?? false;
    },
    clearStoreOwnerProfile: (state) => {
      state.id = null;
      state.fullName = "";
      state.email = "";
      state.picture = null;
      state.google = false;
    },
  },
});

export const {
  hydrateStoreOwner,
  setStoreOwnerProfile,
  clearStoreOwnerProfile,
} = storeOwnerSlice.actions;

export default storeOwnerSlice.reducer;