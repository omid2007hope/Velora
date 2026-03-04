// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../redux/store/index.js";
import Home from "../page.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </StrictMode>,
);


