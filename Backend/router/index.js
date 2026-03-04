// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const express = require("express");
const router = express.Router();

const { CustomerData } = require("../controller/version_1/Register");
const { CustomerDetails } = require("../controller/version_1/Account");
const { loginIntoTheAccount } = require("../controller/version_1/Login");
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

router.post("/server/customer", CustomerData);

router.post("/server/customer/login", loginIntoTheAccount);

router.post("/server/customer/login/account", CustomerDetails);

router.post("/server/customer/login/account/address", CustomerAddress);

router.post("/server/customer/login/account/payment", PaymentDetails);

// Products
router.post("/server/products", createProduct);
router.get("/server/products", listProducts);
router.get("/server/products/:id", getProduct);

// Reviews
router.get("/server/products/:productId/reviews", listReviews);
router.post("/server/products/:productId/reviews", createReview);

// Cart
router.post("/server/cart", getCart);
router.get("/server/cart", getCart); // support GET for tests/tools
router.post("/server/cart/item", addItem);
router.patch("/server/cart/item", updateQuantity);
router.delete("/server/cart/item", removeItem);
router.delete("/server/cart", clearCart);

// Orders / Checkout
router.post("/server/checkout/order", createOrder);
router.get("/server/checkout/order", listOrders);
router.patch("/server/checkout/order/:id", updateOrderStatus);

module.exports = router;


