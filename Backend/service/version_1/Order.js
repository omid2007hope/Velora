// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Order");
const Product = require("../../model/Products");
const BaseService = require("../BaseService");

module.exports = new (class OrderService extends BaseService {
  async buildItems(items = []) {
    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } }).lean();
    const productMap = new Map(
      products.map((p) => [String(p._id), p]),
    );

    const normalizedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = productMap.get(String(item.productId));
      if (!product) {
        const error = new Error("Product not found in order");
        error.status = 404;
        throw error;
      }

      const unitPrice =
        typeof product.newPrice === "number" && product.newPrice > 0
          ? product.newPrice
          : product.price;

      const normalized = {
        productId: product._id,
        name: product.name,
        image: product.imageUrl || product.image,
        selectedColor: item.selectedColor || "",
        selectedSize: item.selectedSize || "",
        quantity: item.quantity || 1,
        oldPrice: product.oldPrice ?? product.price,
        newPrice: unitPrice,
        discount: product.discount || "",
      };

      subtotal += normalized.newPrice * normalized.quantity;
      normalizedItems.push(normalized);
    }

    return { normalizedItems, subtotal };
  }

  async createOrder({
    userId,
    guestEmail,
    items,
    shipping,
    tax,
    currency = "USD",
    addressSnapshot,
  }) {
    const { normalizedItems, subtotal } = await this.buildItems(items);
    const shippingAmount = Number(shipping || 0);
    const taxAmount = Number(tax || 0);
    const total = subtotal + shippingAmount + taxAmount;
    const currencyCode = currency.toUpperCase();

    const payload = {
      userId,
      guestEmail: guestEmail || null,
      items: normalizedItems,
      subtotal,
      shipping: shippingAmount,
      tax: taxAmount,
      total,
      currency: currencyCode,
      addressSnapshot,
    };

    return this.createObject(payload);
  }

  async listByUser({ userId, guestEmail }) {
    const filter = { userId };
    if (guestEmail) filter.guestEmail = guestEmail;
    return this.findAllWithSort(filter, { createdAt: -1 });
  }

  async updateStatus(id, { paymentStatus, orderStatus, userId }) {
    const update = {};
    if (paymentStatus) update.paymentStatus = paymentStatus;
    if (orderStatus) update.orderStatus = orderStatus;

    const filter = { _id: id };
    if (userId) {
      filter.userId = userId;
    }

    return this.update(filter, update);
  }
})(model);


