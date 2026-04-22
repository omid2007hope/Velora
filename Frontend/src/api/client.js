/**
 * Centralized Axios client for all backend API calls.
 * Reads base URL from environment; falls back to "/api".
 * Attaches Bearer token automatically for authenticated requests.
 */
import axios from "axios";
import { getAccessToken } from "@/app/lib/browser-storage";

const apiBaseUrl =
  (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  ).trim() || "/api";

const client = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

// Attach auth token to every request when available
client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalise error responses so callers get a consistent shape
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error.message || "An error occurred";
    return Promise.reject(new Error(message));
  },
);

export default client;
