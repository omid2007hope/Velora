import { createSlice } from "@reduxjs/toolkit";
import { getStoredStoreOwner } from "../../lib/browser-storage";

const data = getStoredStoreOwner();

const storeOwnerSlice = createSlice({
  name: "storeOwner",
  initialState: {
    id: data?._id,
    fullName: data?.fullName || "",
    email: data?.email || "",
    picture: data?.picture || "",
    google: data?.google || false,
  },
  reducers: {
    setStoreOwner: (state, action) => {
      state.id = action.payload._id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
      state.google = action.payload.google;
    },
    clearStoreOwner: (state) => {
      state.id = null;
      state.fullName = "";
      state.email = "";
      state.picture = "";
      state.google = false;
    },
  },
});

export const { setStoreOwner, clearStoreOwner } = storeOwnerSlice.actions;

export default storeOwnerSlice.reducer;
