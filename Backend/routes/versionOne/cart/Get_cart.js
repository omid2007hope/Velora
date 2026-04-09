const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { getCart } = require("../../../controller/version_1/Cart");

const router = express.Router();

router.get("/server/cart", requireAuth, getCart);

module.exports = router;
