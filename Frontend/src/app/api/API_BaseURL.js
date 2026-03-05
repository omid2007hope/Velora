// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
// Prefer same-origin "/api" gateway in production (nginx proxies /api → backend).
// Support both NEXT_PUBLIC_API_URL and NEXT_PUBLIC_API_BASE_URL for flexibility.
// Keep env override for local development (e.g. http://localhost:4000).
const envBase =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "";

export const API_BaseURL = envBase.trim() || "/api";


