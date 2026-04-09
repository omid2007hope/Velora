const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { listOrders } = require("../../../controller/OrderController");

const router = express.Router();

router.get("/server/checkout/order", requireAuth, listOrders);

module.exports = router;
