const express = require("express");
const {
  createProduct,
  createSellerProduct,
} = require("../../../controller/ProductController");
const { requireSeller } = require("../../../middleware/auth/authenticate");
const {
  validateCreateProduct,
} = require("../../../middleware/validation/ProductValidation");

const router = express.Router();

router.post("/server/products", validateCreateProduct, createProduct);
router.post(
  "/server/seller/products",
  requireSeller,
  validateCreateProduct,
  createSellerProduct,
);

module.exports = router;
