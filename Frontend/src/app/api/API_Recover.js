// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

export async function requestEmailVerification(email) {
  const payload = { email: email.trim().toLowerCase() };
  const response = await axios.post(
    `${API_BaseURL}/server/customer/email/verify`,
    payload,
  );
  return response.data;
}

export async function confirmEmailVerification(token) {
  const response = await axios.post(
    `${API_BaseURL}/server/customer/email/verify/confirm`,
    { token },
  );
  return response.data;
}

export async function requestPasswordReset(email, newPassword) {
  const payload = {
    email: email.trim().toLowerCase(),
    newPassword: newPassword.trim(),
  };
  const response = await axios.post(
    `${API_BaseURL}/server/customer/password-reset`,
    payload,
  );
  return response.data;
}

export async function confirmPasswordReset(token) {
  const response = await axios.post(
    `${API_BaseURL}/server/customer/password-reset/confirm`,
    { token },
  );
  return response.data;
}

