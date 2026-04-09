const Payment = require("../model/Payment");
const stripe = require("../utils/stripeClient");
const { createHttpError } = require("../utils/httpError");

async function savePaymentMethod({ userId, paymentMethodId, billingName }) {
  const stripeMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

  if (!stripeMethod || stripeMethod.type !== "card") {
    throw createHttpError(400, "Unsupported payment method");
  }

  const card = stripeMethod.card || {};
  const existingPaymentMethod = await Payment.findOne({ paymentMethodId }).lean();

  if (existingPaymentMethod) {
    return {
      source: "database",
      existed: true,
      data: existingPaymentMethod,
    };
  }

  const savedPaymentMethod = await new Payment({
    userId,
    provider: "stripe",
    paymentMethodId,
    brand: card.brand,
    last4: card.last4,
    expMonth: card.exp_month,
    expYear: card.exp_year,
    billingName:
      billingName || stripeMethod.billing_details?.name || undefined,
  }).save();

  return {
    source: "created",
    existed: false,
    data: savedPaymentMethod,
  };
}

module.exports = {
  savePaymentMethod,
};
