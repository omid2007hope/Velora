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

const PaymentIntent = require("../model/PaymentIntent");
const BaseService = require("./BaseService");
const stripe = require("../utils/stripeClient");
const { createHttpError } = require("../utils/httpError");

module.exports = new (class PaymentIntentService extends BaseService {
  async createPaymentIntentForOrder({
    orderId,
    provider = "stripe",
    amount,
    currency,
  }) {
    const amountInCents = Math.round(Number(amount || 0) * 100);
    const normalizedCurrency = (currency || "USD").toLowerCase();

    if (amountInCents < 50) {
      throw createHttpError(400, "Order amount too low");
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: normalizedCurrency,
      metadata: {
        orderId: String(orderId),
      },
    });

    await this.createObject({
      orderId,
      provider,
      providerIntentId: intent.id,
      amount,
      currency: normalizedCurrency.toUpperCase(),
      status: intent.status || "requires_payment_method",
    });

    return {
      providerIntentId: intent.id,
      clientSecret: intent.client_secret,
      status: intent.status || "requires_payment_method",
    };
  }

  async updatePaymentIntentStatus(orderId, status) {
    return this.update({ orderId }, { status });
  }
})(PaymentIntent);
