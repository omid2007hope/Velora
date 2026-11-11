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
 * Centralized Axios client for all backend API calls.
 * Reads base URL from environment; falls back to "/api".
 * Attaches Bearer token automatically for authenticated requests.
 * Automatically refreshes an expired seller access token on 401 responses.
 */
import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveAuthSession,
  clearAuthSession,
} from "@/app/lib/browser-storage";
import { store } from "@/app/redux/store";
import { clearAuth } from "@/app/redux/slice/authSlice";
import { clearUserProfile } from "@/app/redux/slice/UserSlice";
import { clearStoreOwnerProfile } from "@/app/redux/slice/StoreOwnerSlice";

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

// On 401, attempt a silent token refresh then replay the original request.
// Only fires when we actually sent an Authorization header (i.e. we had a
// token but it was expired). If no header was sent, we skip straight through.
// After a confirmed failed refresh the session is cleared and a DOM event is
// dispatched so UI guards can react (e.g. redirect to sign-in).
let isRefreshing = false;
let pendingQueue = [];

function processPendingQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  pendingQueue = [];
}

function expireSession() {
  clearAuthSession();
  store.dispatch(clearAuth());
  store.dispatch(clearUserProfile());
  store.dispatch(clearStoreOwnerProfile());
}

function getRefreshEndpoint() {
  const authState = store.getState()?.auth;
  if (authState?.storeOwner) {
    return "/server/store-owner/token/refresh";
  }

  return "/server/customer/token/refresh";
}

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const is401 = error?.response?.status === 401;
    // Only attempt refresh when we actually sent a token that was rejected.
    // If no Authorization header was present the request was unauthenticated
    // to begin with — no point trying to refresh.
    const hadAuthHeader = !!originalRequest.headers?.Authorization;
    const alreadyRetried = originalRequest._retry;

    if (!is401 || !hadAuthHeader || alreadyRetried) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      expireSession();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until the refresh completes
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${apiBaseUrl}${getRefreshEndpoint()}`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      const newToken = data.token;
      saveAuthSession({ token: newToken });
      processPendingQueue(null, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return client(originalRequest);
    } catch (refreshError) {
      processPendingQueue(refreshError, null);
      expireSession();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default client;
