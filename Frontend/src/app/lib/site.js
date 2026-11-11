// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
