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

const SITE_URL_KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "SITE_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_URL",
];

const API_URL_KEYS = [
  "API_PROXY_TARGET",
  "BACKEND_URL",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_API_BASE_URL",
];

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

function ensureProtocol(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;

  if (/^(localhost|127\.0\.0\.1)(:\d+)?/i.test(value)) {
    return `http://${value}`;
  }

  return `https://${value}`;
}

export function normalizeUrl(value) {
  return trimTrailingSlash(ensureProtocol(String(value || "").trim()));
}

export function getSiteUrl() {
  const envValue = SITE_URL_KEYS.map((key) => process.env[key]).find(Boolean);
  return normalizeUrl(envValue || "https://velorashop.app");
}

export function getApiBaseUrl() {
  const envValue = API_URL_KEYS.map((key) => process.env[key]).find(Boolean);
  const fallbackApiBase =
    process.env.NODE_ENV === "production" ? `${getSiteUrl()}/api` : "http://localhost:3000";

  return normalizeUrl(envValue || fallbackApiBase);
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function resolveImageUrl(value) {
  if (!value) {
    return absoluteUrl("/opengraph-image");
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return absoluteUrl(normalizedPath);
}
