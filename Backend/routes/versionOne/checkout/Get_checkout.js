const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { listOrders } = require("../../../api/controller/OrderController");

const router = express.Router();

router.get("/order", requireAuth, listOrders);

module.exports = router;

