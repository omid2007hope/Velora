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
  return normalizeUrl(envValue || "http://localhost:3000");
}

export function getApiBaseUrl() {
  const envValue = API_URL_KEYS.map((key) => process.env[key]).find(Boolean);
  return normalizeUrl(envValue || `${getSiteUrl()}/api`);
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
