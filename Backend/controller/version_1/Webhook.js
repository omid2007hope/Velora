// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const stripe = require("../../utils/stripeClient");
const paymentIntentService = require("../../service/version_1/PaymentIntent");
const orderService = require("../../service/version_1/Order");

async function handleStripeWebhook(req, res) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    // Webhook signature validation is disabled when no secret is present.
    return res.status(200).json({ received: true, skipped: true });
  }

  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody || req.body,
      signature,
      webhookSecret,
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;
      await paymentIntentService.markStatus(intent.metadata.orderId, "succeeded");
      await orderService.updateStatus(intent.metadata.orderId, {
        userId: undefined,
        paymentStatus: "paid",
        orderStatus: "processing",
      });
    }

    if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object;
      await paymentIntentService.markStatus(intent.metadata.orderId, "failed");
      await orderService.updateStatus(intent.metadata.orderId, {
        userId: undefined,
        paymentStatus: "failed",
      });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook handling error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleStripeWebhook,
};
