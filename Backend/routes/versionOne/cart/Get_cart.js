const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { getCart } = require("../../../controller/CartController");

const router = express.Router();

router.get("/server/cart", requireAuth, getCart);

module.exports = router;
