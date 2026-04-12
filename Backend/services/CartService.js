const Cart = require("../model/Cart");
const Product = require("../model/Product");
const { createHttpError } = require("../utils/httpError");

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ userId }).lean();

  if (!cart) {
    const createdCart = await new Cart({
      userId,
      sessionId: null,
      items: [],
    }).save();

    cart = createdCart.toObject();
  }

  return cart;
}

async function getCartByUser(userId) {
  return getOrCreateCart(userId);
}

async function addCartItem({ userId, item }) {
  const cart = await getOrCreateCart(userId);
  const product = await Product.findById(item.productId).lean();

  if (!product) {
    throw createHttpError(404, "Product not found");
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
  const itemIndex = items.findIndex(
    (existingItem) =>
      String(existingItem.productId) === String(item.productId) &&
      existingItem.variant?.selectedColor === item.variant?.selectedColor &&
      existingItem.variant?.selectedSize === item.variant?.selectedSize,
  );

  if (itemIndex >= 0) {
    items[itemIndex].quantity = item.quantity ?? items[itemIndex].quantity;
    items[itemIndex].priceSnapshot = priceSnapshot;
    items[itemIndex].productSnapshot = productSnapshot;
  } else {
    items.push({
      productId: product._id,
      variant: item.variant || {},
      quantity: item.quantity ?? 1,
      priceSnapshot,
      productSnapshot,
    });
  }

  return Cart.findOneAndUpdate(
    { _id: cart._id },
    { items },
    { returnDocument: "after", runValidators: true },
  ).lean();
}

async function updateCartItemQuantity({ userId, itemId, quantity }) {
  const cart = await getOrCreateCart(userId);
  const items = cart.items || [];
  const itemIndex = items.findIndex((item) => String(item._id) === String(itemId));

  if (itemIndex === -1) {
    return cart;
  }

  items[itemIndex].quantity = Math.max(1, Number(quantity) || 1);

  return Cart.findOneAndUpdate(
    { _id: cart._id },
    { items },
    { returnDocument: "after", runValidators: true },
  ).lean();
}

async function removeCartItem({ userId, itemId }) {
  const cart = await getOrCreateCart(userId);
  const items = (cart.items || []).filter(
    (item) => String(item._id) !== String(itemId),
  );

  return Cart.findOneAndUpdate(
    { _id: cart._id },
    { items },
    { returnDocument: "after", runValidators: true },
  ).lean();
}

async function clearCart(userId) {
  const cart = await getOrCreateCart(userId);

  return Cart.findOneAndUpdate(
    { _id: cart._id },
    { items: [] },
    { returnDocument: "after", runValidators: true },
  ).lean();
}

module.exports = {
  getCartByUser,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
};
