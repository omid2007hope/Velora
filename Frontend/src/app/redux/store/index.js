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

// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slice/BasketSlice";
import authReducer from "../slice/authSlice";
import userReducer from "../slice/UserSlice";
import storeOwnerReducer from "../slice/StoreOwnerSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    auth: authReducer,
    user: userReducer,
    storeOwnerProfile: storeOwnerReducer,
  },
});
