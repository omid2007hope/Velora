const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { listOrders } = require("../../../controller/OrderController");

const router = express.Router();

router.get("/order", requireAuth, listOrders);

module.exports = router;
