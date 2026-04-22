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

// ─── Customer ───────────────────────────────────────────────────────────────

export async function loginCustomer(payload) {
  const response = await client.post("/server/customer/login", payload);
  return response.data;
}

export async function registerCustomer(payload) {
  const response = await client.post("/server/customer", payload);
  return response.data;
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
    authView === "seller"
      ? "/server/store-owner/email/verify"
      : "/server/customer/email/verify";

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
