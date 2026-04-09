const express = require("express");
const { createProduct } = require("../../../controller/ProductController");
const {
  validateCreateProduct,
} = require("../../../middleware/validation/ProductValidation");

const router = express.Router();

router.post("/server/products", validateCreateProduct, createProduct);

module.exports = router;
