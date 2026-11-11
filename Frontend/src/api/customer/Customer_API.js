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
 * Customer_API — customer profile, address and payment management.
 * All endpoints require an authenticated token (handled by client interceptor).
 */
import client from "@/api/client";

// ─── Account ─────────────────────────────────────────────────────────────────

export async function updateAccountDetails(payload) {
  const response = await client.post("/server/customer/login/account", payload);
  return response.data;
}

// ─── Address ─────────────────────────────────────────────────────────────────

export async function updateAddressDetails(payload) {
  const response = await client.post(
    "/server/customer/login/account/address",
    payload,
  );
  return response.data;
}

// ─── Payment ─────────────────────────────────────────────────────────────────

export async function updatePaymentDetails(payload) {
  const response = await client.post(
    "/server/customer/login/account/payment",
    payload,
  );
  return response.data;
}
