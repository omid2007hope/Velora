import axios from "axios";
import { apiBaseUrl } from "@/app/services/api-base-url";

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

export async function requestEmailVerification(email, authView) {
  const response = await axios.post(
    `${apiBaseUrl}/server/customer/email/verify`,
    { email: email.trim().toLowerCase(), authView },
  );

  return response.data;
}

export async function confirmEmailVerification(token) {
  const response = await axios.post(
    `${apiBaseUrl}/server/customer/email/verify/confirm`,
    { token },
  );

  return response.data;
}

export async function requestPasswordReset(email, newPassword, authView) {
  const response = await axios.post(
    `${apiBaseUrl}/server/customer/password-reset`,
    {
      email: email.trim().toLowerCase(),
      newPassword: newPassword.trim(),
      authView,
    },
  );

  return response.data;
}

export async function confirmPasswordReset(token) {
  const response = await axios.post(
    `${apiBaseUrl}/server/customer/password-reset/confirm`,
    { token },
  );

  return response.data;
}
