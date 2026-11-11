// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
