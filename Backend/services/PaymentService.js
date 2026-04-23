const Payment = require("../model/Payment");
const BaseService = require("./BaseService");
const stripe = require("../utils/stripeClient");
const { createHttpError } = require("../utils/httpError");

module.exports = new (class PaymentService extends BaseService {
  async savePaymentMethod({ userId, paymentMethodId, billingName }) {
    const stripeMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    if (!stripeMethod || stripeMethod.type !== "card") {
      throw createHttpError(400, "Unsupported payment method");
    }

    const card = stripeMethod.card || {};
    const existingPaymentMethod = await this.model
      .findOne({ paymentMethodId })
      .lean();

    if (existingPaymentMethod) {
      return {
        source: "database",
        existed: true,
        data: existingPaymentMethod,
      };
    }

    const savedPaymentMethod = await this.createObject({
      userId,
      provider: "stripe",
      paymentMethodId,
      brand: card.brand,
      last4: card.last4,
      expMonth: card.exp_month,
      expYear: card.exp_year,
      billingName:
        billingName || stripeMethod.billing_details?.name || undefined,
    });

    return {
      source: "created",
      existed: false,
      data: savedPaymentMethod,
    };
  }
})(Payment);
