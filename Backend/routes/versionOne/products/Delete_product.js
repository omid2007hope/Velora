const express = require("express");
const router = express.Router();

const requireSeller = require("../../../middleware/auth/system/Seller");

const { deleteProductById } = require("../../../controller/ProductController");

router.delete("/seller/products/:id", requireSeller, deleteProductById);

module.exports = router;
