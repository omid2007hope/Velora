// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Order");
const BaseService = require("../BaseService");

module.exports = new (class OrderService extends BaseService {
  async createOrder({
    userId,
    guestEmail,
    items,
    subtotal,
    shipping,
    tax,
    total,
    currency = "USD",
    addressSnapshot,
  }) {
    const payload = {
      userId: userId || null,
      guestEmail: guestEmail || null,
      items,
      subtotal,
      shipping,
      tax,
      total,
      currency,
      addressSnapshot,
    };

    return this.createObject(payload);
  }

  async listByUser({ userId, guestEmail }) {
    const filter = {};
    if (userId) filter.userId = userId;
    if (guestEmail) filter.guestEmail = guestEmail;
    return this.findAllWithSort(filter, { createdAt: -1 });
  }

  async updateStatus(id, { paymentStatus, orderStatus }) {
    const update = {};
    if (paymentStatus) update.paymentStatus = paymentStatus;
    if (orderStatus) update.orderStatus = orderStatus;

    return this.update({ _id: id }, update);
  }
})(model);


