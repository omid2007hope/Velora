const express = require("express");
const {
  listProducts,
  listSellerProducts,
  getProductById,
} = require("../../../controller/ProductController");
const { requireSeller } = require("../../../middleware/auth/authenticate");
const {
  validateProductId,
} = require("../../../middleware/validation/ProductValidation");

const router = express.Router();

router.get("/products", listProducts);
router.get("/seller/products", requireSeller, listSellerProducts);
router.get("/products/:id", validateProductId, getProductById);

module.exports = router;
