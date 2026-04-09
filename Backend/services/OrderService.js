const Order = require("../model/Order");
const Product = require("../model/Products");
const { createHttpError } = require("../utils/httpError");

async function buildOrderItems(items = []) {
  const productIds = items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } }).lean();
  const productMap = new Map(products.map((product) => [String(product._id), product]));

  const normalizedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = productMap.get(String(item.productId));

    if (!product) {
      throw createHttpError(404, "Product not found in order");
    }

    const unitPrice =
      typeof product.newPrice === "number" && product.newPrice > 0
        ? product.newPrice
        : product.price;

    const normalizedItem = {
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

    subtotal += normalizedItem.newPrice * normalizedItem.quantity;
    normalizedItems.push(normalizedItem);
  }

  return { normalizedItems, subtotal };
}

async function createOrder({
  userId,
  guestEmail,
  items,
  shipping,
  tax,
  currency = "USD",
  addressSnapshot,
}) {
  const { normalizedItems, subtotal } = await buildOrderItems(items);
  const shippingAmount = Number(shipping || 0);
  const taxAmount = Number(tax || 0);

  return new Order({
    userId,
    guestEmail: guestEmail || null,
    items: normalizedItems,
    subtotal,
    shipping: shippingAmount,
    tax: taxAmount,
    total: subtotal + shippingAmount + taxAmount,
    currency: currency.toUpperCase(),
    addressSnapshot,
  }).save();
}

async function listOrdersByUser({ userId, guestEmail }) {
  const filter = { userId };

  if (guestEmail) {
    filter.guestEmail = guestEmail;
  }

  return Order.find(filter).sort({ createdAt: -1 });
}

async function updateOrderStatus(id, { paymentStatus, orderStatus, userId }) {
  const update = {};

  if (paymentStatus) {
    update.paymentStatus = paymentStatus;
  }

  if (orderStatus) {
    update.orderStatus = orderStatus;
  }

  const filter = { _id: id };

  if (userId) {
    filter.userId = userId;
  }

  return Order.findOneAndUpdate(filter, update, {
    returnDocument: "after",
  });
}

module.exports = {
  createOrder,
  listOrdersByUser,
  updateOrderStatus,
};
