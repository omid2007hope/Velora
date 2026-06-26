const express = require("express");
const requireAuth = require("../../../middleware/auth/token/authorization/Mandatory");

const { getCart, addCartItem } = require("../../../controller/CartController");
const { validateAddCartItem } = require("../../../middleware/validation/CartValidation");

const router = express.Router();

router.post("/item", requireAuth, validateAddCartItem, addCartItem);

module.exports = router;
