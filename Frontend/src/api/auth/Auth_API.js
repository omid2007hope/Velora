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
 * Auth_API — all authentication endpoints.
 * Covers both Customer and StoreOwner (seller) flows.
 */
import client from "@/api/client";

// ─── Helpers ────────────────────────────────────────────────────────────────

function mapStoreOwner(storeOwner) {
  if (!storeOwner) return null;
  return {
    _id: storeOwner._id,
    fullName: storeOwner.storeOwnerName,
    email: storeOwner.storeOwnerEmailAddress,
    provider: storeOwner.storeOwnerProvider,
    isEmailVerified: !!storeOwner.isEmailVerified,
    role: "seller",
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function mapCustomer(customer) {
  if (!customer) return null;
  return {
    _id: customer._id,
    fullName: customer.fullName,
    email: customer.email,
    isEmailVerified: !!customer.isEmailVerified,
    role: "customer",
  };
}

// ─── Customer ───────────────────────────────────────────────────────────────

export async function loginCustomer(payload) {
  const response = await client.post("/server/customer/login", payload);
  return { ...response.data, data: mapCustomer(response.data?.data) };
}

export async function registerCustomer(payload) {
  const response = await client.post("/server/customer", payload);
  return { ...response.data, data: mapCustomer(response.data?.data) };
}

// ─── Store Owner (Seller) ────────────────────────────────────────────────────

export async function loginStoreOwner(payload) {
  const response = await client.post("/server/store-owner/login", {
    storeOwnerEmailAddress: payload.email.trim().toLowerCase(),
    storeOwnerPassword: payload.password,
  });
  return { ...response.data, data: mapStoreOwner(response.data?.data) };
}

export async function registerStoreOwner(payload) {
  const response = await client.post("/server/store-owner", {
    storeOwnerName: payload.fullName.trim(),
    storeOwnerEmailAddress: payload.email.trim().toLowerCase(),
    storeOwnerPassword: payload.password,
  });
  return { ...response.data, data: mapStoreOwner(response.data?.data) };
}

// ─── Email Verification ──────────────────────────────────────────────────────

export async function requestEmailVerification(email, authView) {
  const path =
    authView === "seller" ? "/server/store-owner/email/verify" : "/server/customer/email/verify";

  const response = await client.post(path, {
    email: email.trim().toLowerCase(),
    authView,
  });
  return response.data;
}

export async function confirmEmailVerification(token, authView = "customer") {
  const path =
    authView === "seller"
      ? "/server/store-owner/email/verify/confirm"
      : "/server/customer/email/verify/confirm";

  const response = await client.post(path, { token });
  return response.data;
}

// ─── Password Reset ──────────────────────────────────────────────────────────

export async function requestPasswordReset(email, newPassword, authView) {
  const path =
    authView === "seller"
      ? "/server/store-owner/password-reset"
      : "/server/customer/password-reset";

  const response = await client.post(path, {
    email: email.trim().toLowerCase(),
    newPassword: newPassword.trim(),
    authView,
  });
  return response.data;
}

export async function confirmPasswordReset(token, authView = "customer") {
  const path =
    authView === "seller"
      ? "/server/store-owner/password-reset/confirm"
      : "/server/customer/password-reset/confirm";

  const response = await client.post(path, { token });
  return response.data;
}
