const express = require("express");
const router = express.Router();

const requireSeller = require("../../../middleware/auth/system/Seller");
const { validateProductId } = require("../../../middleware/validation/ProductValidation");

const { deleteProductById } = require("../../../controller/ProductController");

router.delete("/seller/products/:id", requireSeller, validateProductId, deleteProductById);

module.exports = router;
