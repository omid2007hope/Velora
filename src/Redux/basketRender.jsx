import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("BasketItems");

const initialState = saved ? JSON.parse(saved) : [];

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("BasketItems", JSON.stringify(state));
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
