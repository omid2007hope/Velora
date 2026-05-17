const express = require("express");
const router = express.Router();

const { requireSeller } = require("../../../middleware/auth/authenticate");
const {
  validatePatchProduct,
} = require("../../../middleware/validation/ProductValidation");
const { patchProductByid } = require("../../../api/controller/ProductController");

router.patch(
  "/seller/products/:id",
  requireSeller,
  validatePatchProduct,
  patchProductByid,
);

module.exports = router;

