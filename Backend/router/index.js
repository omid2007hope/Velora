// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { validateBody, validateQuery } = require("../middleware/validate");
const { authLimiter } = require("../middleware/rateLimit");
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
  passwordResetRequestSchema,
  tokenOnlySchema,
  emailOnlySchema,
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
  requestPasswordReset,
  confirmPasswordReset,
} = require("../controller/version_1/Password");
const {
  requestVerification,
  confirmVerification,
} = require("../controller/version_1/EmailVerification");
const {
  createOrder,
  listOrders,
  updateOrderStatus,
} = require("../controller/version_1/Order");

// Health check for the API
router.get("/server", (req, res) => {
  return res.status(200).send("server is running");
});

// Register a new customer account
router.post(
  "/server/customer",
  validateBody(registerSchema),
  CustomerData,
);

// Log in with email/password and issue access + refresh tokens
router.post(
  "/server/customer/login",
  authLimiter,
  validateBody(loginSchema),
  loginIntoTheAccount,
);

// Exchange a refresh token for a new access token
router.post(
  "/server/customer/token/refresh",
  authLimiter,
  validateBody(refreshSchema),
  refreshAccessToken,
);

// Update authenticated customer profile details
router.post(
  "/server/customer/login/account",
  requireAuth,
  validateBody(profileSchema),
  CustomerDetails,
);

// Send verification email to the customer
router.post(
  "/server/customer/email/verify",
  validateBody(emailOnlySchema),
  requestVerification,
);

// Confirm email verification using the token
router.post(
  "/server/customer/email/verify/confirm",
  validateBody(tokenOnlySchema),
  confirmVerification,
);

// Save or update the customer's shipping address
router.post(
  "/server/customer/login/account/address",
  requireAuth,
  validateBody(addressSchema),
  CustomerAddress,
);

// Save or update the customer's payment method
router.post(
  "/server/customer/login/account/payment",
  requireAuth,
  validateBody(paymentMethodSchema),
  PaymentDetails,
);

// Products: create, list, and fetch individual product details
router.post("/server/products", createProduct);
router.get("/server/products", listProducts);
router.get("/server/products/:id", getProduct);

// Reviews: list and create reviews for a specific product
router.get("/server/products/:productId/reviews", listReviews);
router.post("/server/products/:productId/reviews", createReview);

// Cart: view cart, add/update/remove items, or clear the cart
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

// Password reset (two-step): request token then confirm reset with token
router.post(
  "/server/customer/password-reset",
  validateBody(passwordResetRequestSchema),
  requestPasswordReset,
);
router.post(
  "/server/customer/password-reset/confirm",
  validateBody(tokenOnlySchema),
  confirmPasswordReset,
);

// Orders / Checkout: create orders, list user's orders, and update status
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


