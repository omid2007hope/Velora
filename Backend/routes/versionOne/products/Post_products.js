const express = require("express");
const { createProduct } = require("../../../controller/ProductController");
const requireSeller = require("../../../middleware/auth/system/Seller");

const { validateCreateProduct } = require("../../../middleware/validation/ProductValidation");

const router = express.Router();

router.post("/seller/products", requireSeller, validateCreateProduct, createProduct);

module.exports = router;
