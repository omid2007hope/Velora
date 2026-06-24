const express = require("express");
const { listProducts, getProductById } = require("../../../controller/ProductController");
const { validateProductId } = require("../../../middleware/validation/ProductValidation");

const router = express.Router();

router.get("/seller/products", listProducts);
router.get("/seller/products/:id", validateProductId, getProductById);

module.exports = router;
