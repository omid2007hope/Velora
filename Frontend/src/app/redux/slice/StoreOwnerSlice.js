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