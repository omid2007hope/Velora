import { createSlice } from "@reduxjs/toolkit";
import { getStoredUser } from "../../lib/browser-storage";

const data = getStoredUser();

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: data?._id || null,
    fullName: data?.fullName || "",
    email: data?.email || "",
    picture: data?.picture || null,
    google: data?.google || false,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload._id || null;
      state.fullName = action.payload.fullName || action.payload.name || "";
      state.email = action.payload.email || "";
      state.picture = action.payload.picture || null;
      state.google = action.payload.google ?? false;
    },
    clearUser: (state) => {
      state.id = null;
      state.fullName = "";
      state.email = "";
      state.picture = null;
      state.google = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
