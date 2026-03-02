import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slice/BasketSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
