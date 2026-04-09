const express = require("express");
const { createProduct } = require("../../../controller/version_1/Products");

const router = express.Router();

router.post("/server/products", createProduct);

module.exports = router;
