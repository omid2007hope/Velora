const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { updateOrderStatus } = require("../../../controller/version_1/Order");

const router = express.Router();

router.patch("/server/checkout/order/:id", requireAuth, updateOrderStatus);

module.exports = router;
