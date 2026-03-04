// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

function actorBody(actor = {}) {
  const body = {};
  if (actor.userId) body.userId = actor.userId;
  if (actor.sessionId) body.sessionId = actor.sessionId;
  return body;
}

export async function fetchCart(actor = {}) {
  const res = await axios.post(`${API_BaseURL}/server/cart`, actorBody(actor));
  return res.data?.data;
}

export async function addCartItem(actor = {}, item) {
  const res = await axios.post(`${API_BaseURL}/server/cart/item`, {
    ...actorBody(actor),
    item,
  });
  return res.data?.data;
}

export async function updateCartItemQuantity(actor = {}, itemId, quantity) {
  const res = await axios.patch(`${API_BaseURL}/server/cart/item`, {
    ...actorBody(actor),
    itemId,
    quantity,
  });
  return res.data?.data;
}

export async function removeCartItem(actor = {}, itemId) {
  const res = await axios.delete(`${API_BaseURL}/server/cart/item`, {
    data: { ...actorBody(actor), itemId },
  });
  return res.data?.data;
}

export async function clearCart(actor = {}) {
  const res = await axios.delete(`${API_BaseURL}/server/cart`, {
    data: actorBody(actor),
  });
  return res.data?.data;
}

export default {
  fetchCart,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
};


