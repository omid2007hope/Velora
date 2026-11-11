/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
