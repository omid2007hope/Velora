const express = require("express");
const router = express.Router();

const { listProductsByStoreId } = require("../../../controller/ProductController");

router.get("/seller/products/:id", listProductsByStoreId);

module.exports = router;
