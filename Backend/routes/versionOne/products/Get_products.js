const express = require("express");
const {
  listProducts,
  getProductById,
} = require("../../../controller/ProductController");
const {
  validateProductId,
} = require("../../../middleware/validation/ProductValidation");

const router = express.Router();

router.get("/server/products", listProducts);
router.get("/server/products/:id", validateProductId, getProductById);

module.exports = router;
