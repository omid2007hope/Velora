import axios from "axios";
import { getAuthHeaders } from "@/app/services/auth-headers";
import { apiBaseUrl } from "@/app/services/api-base-url";

export async function createOrder(orderPayload) {
  const response = await axios.post(
    `${apiBaseUrl}/server/checkout/order`,
    orderPayload,
    { headers: getAuthHeaders() },
  );

  return response.data;
}
