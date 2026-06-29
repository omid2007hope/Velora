const express = require("express");
const { listProducts, getProductById } = require("../../../controller/ProductController");

const router = express.Router();

router.get("/seller/products", listProducts);

module.exports = router;
