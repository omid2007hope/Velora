// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const apiProxyTarget =
  process.env.API_PROXY_TARGET ||
  process.env.BACKEND_URL ||
  "http://localhost:4000";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;


