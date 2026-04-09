import { getAccessToken } from "@/app/lib/browser-storage";

export function getAuthHeaders() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
