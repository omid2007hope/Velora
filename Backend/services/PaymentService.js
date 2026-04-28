const Payment = require("../model/Payment");
const Customer = require("../model/Customer");
const BaseService = require("./BaseService");
const stripe = require("../utils/stripeClient");
const { createHttpError } = require("../utils/httpError");

module.exports = new (class PaymentService extends BaseService {
  async savePaymentMethod({ userId, paymentMethodId, billingName }) {
    const customer = await Customer.findById(userId).lean();

    if (!customer) {
      throw createHttpError(404, "Customer not found");
    }

    const stripeMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    if (!stripeMethod || stripeMethod.type !== "card") {
      throw createHttpError(400, "Unsupported payment method");
    }

    if (stripeMethod.customer) {
      throw createHttpError(
        403,
        "Payment method is already attached to another Stripe customer",
      );
    }

    const billingEmail = stripeMethod.billing_details?.email?.trim().toLowerCase();

    if (billingEmail && billingEmail !== customer.email) {
      throw createHttpError(
        403,
        "Payment method email does not match the authenticated customer",
      );
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
