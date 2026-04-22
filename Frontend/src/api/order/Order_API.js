/**
 * Order_API — order creation and checkout.
 * Requires an authenticated customer token (handled by client interceptor).
 */
import client from "@/api/client";

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function createOrder(orderPayload) {
  const response = await client.post("/server/checkout/order", orderPayload);
  return response.data;
}
