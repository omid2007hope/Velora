/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

import { createSlice } from "@reduxjs/toolkit";
import { saveStoredBasket } from "@/app/lib/browser-storage";

const basketSlice = createSlice({
  name: "basket",
  initialState: [],
  reducers: {
    hydrateBasket: (_state, action) => {
      const items = Array.isArray(action.payload) ? action.payload : [];
      return items;
    },

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

export const {
  hydrateBasket,
  addItem,
  updateQuantity,
  removeItem,
  clearBasket,
} = basketSlice.actions;
export default basketSlice.reducer;
