const express = require("express");
const { listProducts } = require("../../../controller/ProductController");

const router = express.Router();

router.get("/seller/products", listProducts);

module.exports = router;
