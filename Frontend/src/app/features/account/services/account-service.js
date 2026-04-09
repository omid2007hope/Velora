import axios from "axios";
import { getAuthHeaders } from "@/app/services/auth-headers";
import { apiBaseUrl } from "@/app/services/api-base-url";

async function postAccountData(path, payload, missingMessage) {
  if (!payload) {
    throw new Error(missingMessage);
  }

  const response = await axios.post(`${apiBaseUrl}${path}`, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export function updateAccountDetails(payload) {
  return postAccountData(
    "/server/customer/login/account",
    payload,
    "account payload is required",
  );
}

export function updateAddressDetails(payload) {
  return postAccountData(
    "/server/customer/login/account/address",
    payload,
    "address payload is required",
  );
}

export function updatePaymentDetails(payload) {
  return postAccountData(
    "/server/customer/login/account/payment",
    payload,
    "payment payload is required",
  );
}
