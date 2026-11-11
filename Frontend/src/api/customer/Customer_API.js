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
