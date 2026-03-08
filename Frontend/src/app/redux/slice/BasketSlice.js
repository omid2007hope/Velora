import { createSlice } from "@reduxjs/toolkit";
import { getStoredBasket, saveStoredBasket } from "@/lib/browser-storage";

const basketSlice = createSlice({
  name: "basket",
  initialState: getStoredBasket(),
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      const existing = state.find(
        (x) =>
          x.id === item.id &&
          x.selectedColor === item.selectedColor &&
          x.selectedSize === item.selectedSize,
      );

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }

      saveStoredBasket(state);
    },

    updateQuantity: (state, action) => {
      const { id, selectedColor, selectedSize, quantity } = action.payload;
      const existing = state.find(
        (x) =>
          x.id === id &&
          x.selectedColor === selectedColor &&
          x.selectedSize === selectedSize,
      );

      if (existing) {
        existing.quantity = Math.max(1, Number(quantity) || 1);
        saveStoredBasket(state);
      }
    },

    removeItem: (state, action) => {
      const { id, selectedColor, selectedSize } = action.payload;
      const newState = state.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          ),
      );
      saveStoredBasket(newState);
      return newState;
    },

    clearBasket: () => {
      saveStoredBasket([]);
      return [];
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;


