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

/**
 * Central API export hub.
 * Import everything from this one file — no deep import paths needed.
 *
 * Usage:
 *   import { loginCustomer, getProducts, createOrder } from "@/api";
 */

export * from "./auth/Auth_API";
export * from "./customer/Customer_API";
export * from "./product/Product_API";
export * from "./Store/Store_API";
export * from "./order/Order_API";
