import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("BasketItems")) || [];

const basketRender = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      // Check if same item already exists (including color + size)
      const existing = state.find(
        (x) => x.id === item.id
        // &&x.selectedColor === item.selectedColor &&
        // x.selectedSize === item.selectedSize
      );

      if (existing) {
        // Increase quantity
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        // Add new item with quantity 1
        state.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("BasketItems", JSON.stringify(state));
    },

    removeItem: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("BasketItems", JSON.stringify(newState));
      return newState;
    },

    decreaseQuantity: (state, action) => {
      const item = state.find((x) => x.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("BasketItems", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, decreaseQuantity } = basketRender.actions;
export default basketRender.reducer;
