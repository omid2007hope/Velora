import axios from "axios";
import { apiBaseUrl } from "@/app/services/api-base-url";

function mapStoreOwner(storeOwner) {
  if (!storeOwner) {
    return null;
  }

  return {
    _id: storeOwner._id,
    fullName: storeOwner.storeOwnerName,
    email: storeOwner.storeOwnerEmailAddress,
    provider: storeOwner.storeOwnerProvider,
    isEmailVerified: !!storeOwner.isEmailVerified,
    role: "seller",
  };
}

export async function loginCustomer(payload) {
  const response = await axios.post(
    `${apiBaseUrl}/server/customer/login`,
    payload,
  );
  return response.data;
}

export async function registerCustomer(payload) {
  const response = await axios.post(`${apiBaseUrl}/server/customer`, payload);
  return response.data;
}

export async function loginStoreOwner(payload) {
  const response = await axios.post(`${apiBaseUrl}/server/store-owner/login`, {
    storeOwnerEmailAddress: payload.email.trim().toLowerCase(),
    storeOwnerPassword: payload.password,
  });

  return {
    ...response.data,
    data: mapStoreOwner(response.data?.data),
  };
}

export async function registerStoreOwner(payload) {
  const response = await axios.post(`${apiBaseUrl}/server/store-owner`, {
    storeOwnerName: payload.fullName.trim(),
    storeOwnerEmailAddress: payload.email.trim().toLowerCase(),
    storeOwnerPassword: payload.password,
  });

  return {
    ...response.data,
    data: mapStoreOwner(response.data?.data),
  };
}

export async function requestEmailVerification(email, authView) {
  const endpoint =
    authView === "seller"
      ? `${apiBaseUrl}/server/store-owner/email/verify`
      : `${apiBaseUrl}/server/customer/email/verify`;

  const response = await axios.post(
    endpoint,
    { email: email.trim().toLowerCase(), authView },
  );

  return response.data;
}

export async function confirmEmailVerification(
  token,
  authView = "customer",
) {
  const endpoint =
    authView === "seller"
      ? `${apiBaseUrl}/server/store-owner/email/verify/confirm`
      : `${apiBaseUrl}/server/customer/email/verify/confirm`;

  const response = await axios.post(
    endpoint,
    { token },
  );

  return response.data;
}

export async function requestPasswordReset(email, newPassword, authView) {
  const endpoint =
    authView === "seller"
      ? `${apiBaseUrl}/server/store-owner/password-reset`
      : `${apiBaseUrl}/server/customer/password-reset`;

  const response = await axios.post(
    endpoint,
    {
      email: email.trim().toLowerCase(),
      newPassword: newPassword.trim(),
      authView,
    },
  );

  return response.data;
}

export async function confirmPasswordReset(token, authView = "customer") {
  const endpoint =
    authView === "seller"
      ? `${apiBaseUrl}/server/store-owner/password-reset/confirm`
      : `${apiBaseUrl}/server/customer/password-reset/confirm`;

  const response = await axios.post(
    endpoint,
    { token },
  );

  return response.data;
}
