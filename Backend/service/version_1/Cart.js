// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Cart");
const BaseService = require("../BaseService");

module.exports = new (class CartService extends BaseService {
  async getOrCreate({ userId, sessionId }) {
    const query = userId ? { userId } : { sessionId };

    let cart = await this.model.findOne(query).lean();
    if (!cart) {
      cart = await this.createObject({
        userId: userId || null,
        sessionId: sessionId || null,
        items: [],
      });
      cart = cart.toObject();
    }
    return cart;
  }

  async upsertItem({ userId, sessionId, item }) {
    const cart = await this.getOrCreate({ userId, sessionId });

    const items = cart.items || [];
    const idx = items.findIndex(
      (x) =>
        String(x.productId) === String(item.productId) &&
        x.variant?.selectedColor === item.variant?.selectedColor &&
        x.variant?.selectedSize === item.variant?.selectedSize,
    );

    if (idx >= 0) {
      items[idx].quantity = item.quantity ?? items[idx].quantity;
      items[idx].priceSnapshot = item.priceSnapshot || items[idx].priceSnapshot;
      items[idx].productSnapshot =
        item.productSnapshot || items[idx].productSnapshot;
    } else {
      items.push(item);
    }

    const updated = await this.model
      .findOneAndUpdate(
        { _id: cart._id },
        { items },
        { new: true, runValidators: true },
      )
      .lean();

    return updated;
  }

  async updateQuantity({ userId, sessionId, itemId, quantity }) {
    const cart = await this.getOrCreate({ userId, sessionId });
    const items = cart.items || [];
    const idx = items.findIndex((x) => String(x._id) === String(itemId));
    if (idx === -1) return cart;

    items[idx].quantity = Math.max(1, Number(quantity) || 1);

    return this.model
      .findOneAndUpdate(
        { _id: cart._id },
        { items },
        { new: true, runValidators: true },
      )
      .lean();
  }

  async removeItem({ userId, sessionId, itemId }) {
    const cart = await this.getOrCreate({ userId, sessionId });
    const items = (cart.items || []).filter(
      (x) => String(x._id) !== String(itemId),
    );

    return this.model
      .findOneAndUpdate(
        { _id: cart._id },
        { items },
        { new: true, runValidators: true },
      )
      .lean();
  }

  async clear({ userId, sessionId }) {
    const cart = await this.getOrCreate({ userId, sessionId });
    return this.model
      .findOneAndUpdate(
        { _id: cart._id },
        { items: [] },
        { new: true, runValidators: true },
      )
      .lean();
  }
})(model);


