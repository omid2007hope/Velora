const express = require("express");
const router = express.Router();

// ! Import all version one routes

const customerRoutes = require("./customer");
const storeOwnerRoutes = require("./storeOwner");
const accountRoutes = require("./account");
const addressRoutes = require("./address");
const paymentRoutes = require("./payment");
const productRoutes = require("./products");
const reviewRoutes = require("./reviews");
const cartRoutes = require("./cart");
const checkoutRoutes = require("./checkout");
const webhookRoutes = require("./webhook");

// ! Register all version one routes

router.use(customerRoutes);
router.use(storeOwnerRoutes);
router.use(accountRoutes);
router.use(addressRoutes);
router.use(paymentRoutes);
router.use(productRoutes);
router.use(reviewRoutes);
router.use(cartRoutes);
router.use(checkoutRoutes);
router.use(webhookRoutes);

// ! Export the routers

module.exports = router;
