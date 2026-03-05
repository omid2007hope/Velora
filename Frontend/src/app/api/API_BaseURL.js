// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
// Prefer same-origin "/api" gateway in production (nginx proxies /api → backend).
// Keep env override for local development (e.g. http://localhost:4000).
export const API_BaseURL =
  (process.env.NEXT_PUBLIC_API_BASE_URL &&
    process.env.NEXT_PUBLIC_API_BASE_URL.trim()) ||
  "/api";


