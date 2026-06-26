const express = require("express");
const router = express.Router();

const requireSeller = require("../../../middleware/auth/system/Seller");

const {
  validatePatchProduct,
  validateProductId,
} = require("../../../middleware/validation/ProductValidation");
const { patchProductByid } = require("../../../controller/ProductController");

router.patch(
  "/seller/products/:id",
  requireSeller,
  validateProductId,
  validatePatchProduct,
  patchProductByid
);

module.exports = router;
