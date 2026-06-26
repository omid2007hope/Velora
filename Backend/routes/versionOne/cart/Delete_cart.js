const express = require("express");
const requireAuth = require("../../../middleware/auth/token/authorization/Mandatory");

const { deleteCartItem, clearCart } = require("../../../controller/CartController");
const { validateDeleteCartItem } = require("../../../middleware/validation/CartValidation");

const router = express.Router();

router.delete("/item", requireAuth, validateDeleteCartItem, deleteCartItem);
router.delete("/", requireAuth, clearCart);

module.exports = router;
