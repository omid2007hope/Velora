// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { validateBody, validateQuery } = require("../middleware/validate");
const {
  registerSchema,
  loginSchema,
  addressSchema,
  profileSchema,
  cartItemSchema,
  updateQuantitySchema,
  orderSchema,
  paymentMethodSchema,
  refreshSchema,
  removeItemSchema,
} = require("../validation/schemas");

const { CustomerData } = require("../controller/version_1/Register");
const { CustomerDetails } = require("../controller/version_1/Account");
const {
  loginIntoTheAccount,
  refreshAccessToken,
} = require("../controller/version_1/Login");
const { CustomerAddress } = require("../controller/version_1/Address");
const { PaymentDetails } = require("../controller/version_1/Payment");
const {
  listProducts,
  getProduct,
  createProduct,
} = require("../controller/version_1/Products");
const {
  listReviews,
  createReview,
} = require("../controller/version_1/Reviews");
const {
  getCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
} = require("../controller/version_1/Cart");
const {
  createOrder,
  listOrders,
  updateOrderStatus,
} = require("../controller/version_1/Order");

router.get("/server", (req, res) => {
  return res.status(200).send("server is running");
});

router.post(
  "/server/customer",
  validateBody(registerSchema),
  CustomerData,
);

router.post(
  "/server/customer/login",
  validateBody(loginSchema),
  loginIntoTheAccount,
);

router.post(
  "/server/customer/token/refresh",
  validateBody(refreshSchema),
  refreshAccessToken,
);

router.post(
  "/server/customer/login/account",
  requireAuth,
  validateBody(profileSchema),
  CustomerDetails,
);

router.post(
  "/server/customer/login/account/address",
  requireAuth,
  validateBody(addressSchema),
  CustomerAddress,
);

router.post(
  "/server/customer/login/account/payment",
  requireAuth,
  validateBody(paymentMethodSchema),
  PaymentDetails,
);

// Products
router.post("/server/products", createProduct);
router.get("/server/products", listProducts);
router.get("/server/products/:id", getProduct);

// Reviews
router.get("/server/products/:productId/reviews", listReviews);
router.post("/server/products/:productId/reviews", createReview);

// Cart
router.post("/server/cart", requireAuth, getCart);
router.get("/server/cart", requireAuth, getCart);
router.post(
  "/server/cart/item",
  requireAuth,
  validateBody(cartItemSchema),
  addItem,
);
router.patch(
  "/server/cart/item",
  requireAuth,
  validateBody(updateQuantitySchema),
  updateQuantity,
);
router.delete(
  "/server/cart/item",
  requireAuth,
  validateBody(removeItemSchema),
  removeItem,
);
router.delete("/server/cart", requireAuth, clearCart);

// Orders / Checkout
router.post(
  "/server/checkout/order",
  requireAuth,
  validateBody(orderSchema),
  createOrder,
);
router.get("/server/checkout/order", requireAuth, listOrders);
router.patch(
  "/server/checkout/order/:id",
  requireAuth,
  updateOrderStatus,
);

module.exports = router;


