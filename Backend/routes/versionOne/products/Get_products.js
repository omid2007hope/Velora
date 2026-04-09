const express = require("express");
const { listProducts, getProduct } = require("../../../controller/version_1/Products");

const router = express.Router();

router.get("/server/products", listProducts);
router.get("/server/products/:id", getProduct);

module.exports = router;
