const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { listOrders } = require("../../../controller/version_1/Order");

const router = express.Router();

router.get("/server/checkout/order", requireAuth, listOrders);

module.exports = router;
