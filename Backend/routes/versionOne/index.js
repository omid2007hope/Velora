const express = require("express");
const router = express.Router();

const customerRoutes = require("./customer");
const storeOwnerRoutes = require("./storeOwner");
const storeRoutes = require("./store");
const accountRoutes = require("./account");
const addressRoutes = require("./address");
const paymentRoutes = require("./payment");
const productRoutes = require("./products");
const reviewRoutes = require("./reviews");
const cartRoutes = require("./cart");
const checkoutRoutes = require("./checkout");
const webhookRoutes = require("./webhook");

const versionOneRouteGroups = [
  customerRoutes,
  storeOwnerRoutes,
  storeRoutes,
  accountRoutes,
  addressRoutes,
  paymentRoutes,
  productRoutes,
  reviewRoutes,
  cartRoutes,
  checkoutRoutes,
  webhookRoutes,
];

versionOneRouteGroups.forEach((featureRouter) => {
  router.use(featureRouter);
});

module.exports = router;
