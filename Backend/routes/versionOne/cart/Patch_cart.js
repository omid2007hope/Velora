const express = require("express");
const requireAuth = require("../../../middleware/auth/token/authorization/Mandatory");

const { updateCartItemQuantity } = require("../../../controller/CartController");
const { validateUpdateCartItemQuantity } = require("../../../middleware/validation/CartValidation");

const router = express.Router();

router.patch("/item", requireAuth, validateUpdateCartItemQuantity, updateCartItemQuantity);

module.exports = router;
