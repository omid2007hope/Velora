// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";
import { getAuthHeaders } from "./authHeaders";

export async function fetchCart() {
  const res = await axios.get(`${API_BaseURL}/server/cart`, {
    headers: getAuthHeaders(),
  });
  return res.data?.data;
}

export async function addCartItem(item) {
  const res = await axios.post(`${API_BaseURL}/server/cart/item`, item, {
    headers: getAuthHeaders(),
  });
  return res.data?.data;
}

export async function updateCartItemQuantity(itemId, quantity) {
  const res = await axios.patch(
    `${API_BaseURL}/server/cart/item`,
    { itemId, quantity },
    { headers: getAuthHeaders() },
  );
  return res.data?.data;
}

export async function removeCartItem(itemId) {
  const res = await axios.delete(`${API_BaseURL}/server/cart/item`, {
    data: { itemId },
    headers: getAuthHeaders(),
  });
  return res.data?.data;
}

export async function clearCart() {
  const res = await axios.delete(`${API_BaseURL}/server/cart`, {
    headers: getAuthHeaders(),
  });
  return res.data?.data;
}

const cartApi = {
  fetchCart,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
};

export default cartApi;


