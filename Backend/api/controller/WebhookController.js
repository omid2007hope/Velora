const asyncHandler = require("../utils/asyncHandler");
const stripe = require("../utils/stripeClient");
const paymentIntentService = require("../services/PaymentIntentService");
const orderService = require("../services/OrderService");
const { createHttpError } = require("../utils/httpError");

const handleStripeWebhook = asyncHandler(async (req, res) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw createHttpError(500, "Stripe webhook secret is not configured");
  }

  const signature = req.headers["stripe-signature"];

  if (!signature) {
    throw createHttpError(400, "Missing Stripe signature header");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody || req.body,
      signature,
      webhookSecret,
    );
  } catch (error) {
    throw createHttpError(400, `Webhook Error: ${error.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;

    await paymentIntentService.updatePaymentIntentStatus(
      intent.metadata.orderId,
      "succeeded",
    );
    await orderService.updateOrderStatus(intent.metadata.orderId, {
      paymentStatus: "paid",
      orderStatus: "processing",
    });
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object;

    await paymentIntentService.updatePaymentIntentStatus(
      intent.metadata.orderId,
      "failed",
    );
    await orderService.updateOrderStatus(intent.metadata.orderId, {
      paymentStatus: "failed",
    });
  }

  return res.status(200).json({ received: true });
});

module.exports = {
  handleStripeWebhook,
};
