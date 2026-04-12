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

router.get("/server/products", listProducts);
router.get("/server/seller/products", requireSeller, listSellerProducts);
router.get("/server/products/:id", validateProductId, getProductById);

module.exports = router;
