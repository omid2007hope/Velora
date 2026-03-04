// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const crypto = require("crypto");
const model = require("../../model/PaymentIntent");
const BaseService = require("../BaseService");

module.exports = new (class PaymentIntentService extends BaseService {
  async createForOrder({ orderId, provider = "stripe", amount, currency }) {
    const providerIntentId = `pi_${crypto.randomBytes(8).toString("hex")}`;

    return this.createObject({
      orderId,
      provider,
      providerIntentId,
      amount,
      currency: currency || "USD",
      status: "requires_payment_method",
    });
  }

  async markStatus(orderId, status) {
    return this.update({ orderId }, { status });
  }
})(model);


