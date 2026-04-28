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