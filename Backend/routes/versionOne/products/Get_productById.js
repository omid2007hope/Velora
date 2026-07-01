const express = require("express");
const router = express.Router();

const { getProductById } = require("../../../controller/ProductController");

router.get("/seller/products/:id", getProductById);

module.exports = router;
