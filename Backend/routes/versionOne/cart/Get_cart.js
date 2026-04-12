const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { getCart } = require("../../../controller/CartController");

const router = express.Router();

router.get("/", requireAuth, getCart);

module.exports = router;
