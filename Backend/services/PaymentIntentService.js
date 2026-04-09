const PaymentIntent = require("../model/PaymentIntent");
const stripe = require("../utils/stripeClient");

async function createPaymentIntentForOrder({
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

  return new PaymentIntent({
    orderId,
    provider,
    providerIntentId: intent.id,
    clientSecret: intent.client_secret,
    amount,
    currency: normalizedCurrency.toUpperCase(),
    status: intent.status || "requires_payment_method",
  }).save();
}

async function updatePaymentIntentStatus(orderId, status) {
  return PaymentIntent.findOneAndUpdate(
    { orderId },
    { status },
    { returnDocument: "after" },
  );
}

module.exports = {
  createPaymentIntentForOrder,
  updatePaymentIntentStatus,
};
