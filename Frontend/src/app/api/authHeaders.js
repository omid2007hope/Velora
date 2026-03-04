export function getAuthHeaders() {
  if (typeof localStorage === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
