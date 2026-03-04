// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Cart");
const Product = require("../../model/Products");
const BaseService = require("../BaseService");

module.exports = new (class CartService extends BaseService {
  async getOrCreate({ userId }) {
    let cart = await this.model.findOne({ userId }).lean();
    if (!cart) {
      const created = await this.createObject({
        userId,
        sessionId: null,
        items: [],
      });
      cart = created.toObject();
    }
    return cart;
  }

  async upsertItem({ userId, item }) {
    const cart = await this.getOrCreate({ userId });

    const product = await Product.findById(item.productId).lean();
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    const priceValue =
      typeof product.newPrice === "number" && product.newPrice > 0
        ? product.newPrice
        : product.price;
    const priceSnapshot = {
      oldPrice: product.oldPrice ?? product.price,
      newPrice: priceValue,
      discount: product.discount || "",
      currency: "USD",
    };

    const productSnapshot = {
      name: product.name,
      image: product.imageUrl || product.image,
      category: product.category,
    };

    const items = cart.items || [];
    const idx = items.findIndex(
      (x) =>
        String(x.productId) === String(item.productId) &&
        x.variant?.selectedColor === item.variant?.selectedColor &&
        x.variant?.selectedSize === item.variant?.selectedSize,
    );

    if (idx >= 0) {
      items[idx].quantity = item.quantity ?? items[idx].quantity;
      items[idx].priceSnapshot = priceSnapshot;
      items[idx].productSnapshot = productSnapshot;
    } else {
      items.push({
        productId: product._id,
        variant: item.variant || {},
        quantity: item.quantity ?? 1,
        priceSnapshot,
        productSnapshot,
      });
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

  async updateQuantity({ userId, itemId, quantity }) {
    const cart = await this.getOrCreate({ userId });
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

  async removeItem({ userId, itemId }) {
    const cart = await this.getOrCreate({ userId });
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

  async clear({ userId }) {
    const cart = await this.getOrCreate({ userId });
    return this.model
      .findOneAndUpdate(
        { _id: cart._id },
        { items: [] },
        { new: true, runValidators: true },
      )
      .lean();
  }
})(model);


