const PaymentIntent = require("../model/PaymentIntent");
const BaseService = require("./BaseService");
const stripe = require("../utils/stripeClient");

module.exports = new (class PaymentIntentService extends BaseService {
  async createPaymentIntentForOrder({
    orderId,
    provider = "stripe",
    amount,
    currency,
  }) {
    const amountInCents = Math.round(Number(amount || 0) * 100);
    const normalizedCurrency = (currency || "USD").toLowerCase();

    const intent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: normalizedCurrency,
      metadata: {
        orderId: String(orderId),
      },
    });

    return this.createObject({
      orderId,
      provider,
      providerIntentId: intent.id,
      clientSecret: intent.client_secret,
      amount,
      currency: normalizedCurrency.toUpperCase(),
      status: intent.status || "requires_payment_method",
    });
  }

  async updatePaymentIntentStatus(orderId, status) {
    return this.update({ orderId }, { status });
  }
})(PaymentIntent);
