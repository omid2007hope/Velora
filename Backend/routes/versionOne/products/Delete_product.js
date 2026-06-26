const express = require("express");
const router = express.Router();

const requireSellerHasStore = require("../../../middleware/auth/system/StoreOwner");

const { deleteProductById } = require("../../../controller/ProductController");

router.delete("/seller/products/:id", requireSellerHasStore, deleteProductById);

module.exports = router;
