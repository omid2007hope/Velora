const express = require("express");
const router = express.Router();

const { requireSeller } = require("../../../middleware/auth/authenticate");

const { deleteProductById } = require("../../../api/controller/ProductController");

router.delete("/seller/products/:id", requireSeller, deleteProductById);

module.exports = router;

