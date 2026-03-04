// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const crypto = require("crypto");
const stripe = require("../../utils/stripeClient");
const model = require("../../model/Payment");
const BaseService = require("../BaseService");

module.exports = new (class PaymentService extends BaseService {
  async savePaymentMethod({ userId, paymentMethodId, billingName }) {
    console.log("Service: saving payment method");

    const stripeMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    if (!stripeMethod || stripeMethod.type !== "card") {
      throw Object.assign(new Error("Unsupported payment method"), {
        status: 400,
      });
    }

    const card = stripeMethod.card || {};

    const payload = {
      userId,
      provider: "stripe",
      paymentMethodId,
      brand: card.brand,
      last4: card.last4,
      expMonth: card.exp_month,
      expYear: card.exp_year,
      billingName:
        billingName || stripeMethod.billing_details?.name || undefined,
    };

    const existing = await this.model
      .findOne({ paymentMethodId })
      .lean()
      .catch(() => null);

    if (existing) {
      return {
        source: "database",
        existed: true,
        data: existing,
      };
    }

    const saved = await this.createObject(payload);

    return {
      source: "created",
      existed: false,
      data: saved,
    };
  }
})(model);


