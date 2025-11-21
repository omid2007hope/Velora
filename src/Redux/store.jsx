import { configureStore } from "@reduxjs/toolkit";
import basketRender from "./basketRender";

export const store = configureStore({
  reducer: {
    list: basketRender,
  },
});
