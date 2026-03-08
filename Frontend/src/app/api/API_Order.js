// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";
import { getAuthHeaders } from "./authHeaders";

export async function createOrder(orderPayload) {
  const res = await axios.post(
    `${API_BaseURL}/server/checkout/order`,
    orderPayload,
    { headers: getAuthHeaders() },
  );
  return res.data;
}

export async function listOrders(params = {}) {
  const res = await axios.get(`${API_BaseURL}/server/checkout/order`, {
    headers: getAuthHeaders(),
    params,
  });
  return res.data?.data || [];
}

export async function updateOrderStatus(id, payload) {
  const res = await axios.patch(
    `${API_BaseURL}/server/checkout/order/${id}`,
    payload,
    { headers: getAuthHeaders() },
  );
  return res.data?.data;
}

const orderApi = { createOrder, listOrders, updateOrderStatus };

export default orderApi;


