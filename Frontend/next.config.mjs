// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const isProd = process.env.NODE_ENV === "production";
const apiProxyTargetRaw =
  process.env.API_PROXY_TARGET || process.env.BACKEND_URL || "http://localhost:4000";
const apiProxyTarget = apiProxyTargetRaw.replace(/\/+$/, "");

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  isProd ? "script-src 'self' 'unsafe-inline'" : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  isProd ? "connect-src 'self' https:" : "connect-src 'self' https: http: ws: wss:",
  "form-action 'self'",
];

if (isProd) {
  cspDirectives.push("upgrade-insecure-requests");
}

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

if (isProd) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.augustman.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: apiProxyTarget + "/api/server/:path*",
      },
      {
        source: "/api/:path*",
        destination: apiProxyTarget + "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
