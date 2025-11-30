import { createSlice } from "@reduxjs/toolkit";

const loadInitialBasket = () => {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("BasketItems")) || [];
  } catch {
    return [];
  }
};

const persistBasket = (state) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("BasketItems", JSON.stringify(state));
};

const basketSlice = createSlice({
  name: "basket",
  initialState: loadInitialBasket(),
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      const existing = state.find(
        (x) =>
          x.id === item.id &&
          x.selectedColor === item.selectedColor &&
          x.selectedSize === item.selectedSize
      );

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }

      persistBasket(state);
    },

    updateQuantity: (state, action) => {
      const { id, selectedColor, selectedSize, quantity } = action.payload;
      const existing = state.find(
        (x) =>
          x.id === id &&
          x.selectedColor === selectedColor &&
          x.selectedSize === selectedSize
      );

      if (existing) {
        existing.quantity = Math.max(1, Number(quantity) || 1);
        persistBasket(state);
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
          )
      );
      persistBasket(newState);
      return newState;
    },

    clearBasket: () => {
      persistBasket([]);
      return [];
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
