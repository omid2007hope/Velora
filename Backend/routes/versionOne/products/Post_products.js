const express = require("express");
const { createProduct } = require("../../../controller/ProductController");
const requireSeller = require("../../../middleware/auth/system/Seller");
const requireSellerHasStore = require("../../../middleware/auth/system/StoreOwner");

const { validateCreateProduct } = require("../../../middleware/validation/ProductValidation");

const router = express.Router();

router.post(
  "/seller/products",
  requireSeller,
  validateCreateProduct,
  requireSellerHasStore,
  createProduct
);

module.exports = router;
