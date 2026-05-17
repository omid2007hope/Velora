const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { getCart } = require("../../../api/controller/CartController");

const router = express.Router();

router.get("/", requireAuth, getCart);

module.exports = router;

