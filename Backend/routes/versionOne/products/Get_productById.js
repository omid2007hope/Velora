const express = require("express");
const router = express.Router();

const { getProductById } = require("../../../controller/ProductController");

router.get("/products/:id", getProductById);

module.exports = router;
