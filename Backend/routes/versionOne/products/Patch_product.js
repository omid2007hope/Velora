const express = require("express");
const router = express.Router();

const { requireSellerHasStore } = require("../../../middleware/auth/authenticate");
const { validatePatchProduct } = require("../../../middleware/validation/ProductValidation");
const { patchProductByid } = require("../../../controller/ProductController");

router.patch("/seller/products/:id", requireSellerHasStore, validatePatchProduct, patchProductByid);

module.exports = router;
