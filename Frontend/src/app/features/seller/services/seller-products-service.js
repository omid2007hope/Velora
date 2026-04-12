import axios from "axios";
import { getAuthHeaders } from "@/app/services/auth-headers";
import { apiBaseUrl } from "@/app/services/api-base-url";

export async function listSellerProducts() {
  const response = await axios.get(`${apiBaseUrl}/server/seller/products`, {
    headers: getAuthHeaders(),
  });

  return response.data?.data ?? [];
}

export async function createSellerProduct(payload) {
  const response = await axios.post(
    `${apiBaseUrl}/server/seller/products`,
    payload,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data?.data;
}
