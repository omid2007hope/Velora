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
