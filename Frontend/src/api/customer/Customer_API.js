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
