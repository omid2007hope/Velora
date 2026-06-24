const express = require("express");
const { createProduct } = require("../../../controller/ProductController");
const { requireSellerHasStore } = require("../../../middleware/auth/authenticate");
const { validateCreateProduct } = require("../../../middleware/validation/ProductValidation");

const router = express.Router();

router.post("/seller/products", requireSellerHasStore, validateCreateProduct, createProduct);

module.exports = router;
