// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slice/BasketSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});


