// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
