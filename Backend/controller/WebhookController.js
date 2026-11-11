/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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

