// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}


