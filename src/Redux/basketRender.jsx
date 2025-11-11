import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    // Action to remove
    removeItem: (state, action) => {
      const newState = state.filter((_, index) => index !== action.payload);
      return newState;
    },
  },
});

export const { addItem, removeItem } = listSlice.actions;
export default listSlice.reducer;
