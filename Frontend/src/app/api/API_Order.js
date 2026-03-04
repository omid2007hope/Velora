import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

export async function createOrder(orderPayload) {
  const res = await axios.post(
    `${API_BaseURL}/server/checkout/order`,
    orderPayload,
  );
  return res.data;
}

export async function listOrders(params = {}) {
  const query = new URLSearchParams();
  if (params.userId) query.set("userId", params.userId);
  if (params.guestEmail) query.set("guestEmail", params.guestEmail);

  const url =
    query.toString().length > 0
      ? `${API_BaseURL}/server/checkout/order?${query.toString()}`
      : `${API_BaseURL}/server/checkout/order`;

  const res = await axios.get(url);
  return res.data?.data || [];
}

export async function updateOrderStatus(id, payload) {
  const res = await axios.patch(
    `${API_BaseURL}/server/checkout/order/${id}`,
    payload,
  );
  return res.data?.data;
}

export default { createOrder, listOrders, updateOrderStatus };
