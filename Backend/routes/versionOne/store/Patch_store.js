const express = require("express");
const requireSeller = require("../../../middleware/auth/system/Seller");

const { patchStoreData } = require("../../../controller/StoreController");
const {
  validatePatchStore,
  validateStoreId,
} = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.patch(
  "/seller/store/:id",
  requireSeller,
  validateStoreId,
  validatePatchStore,
  patchStoreData
);

module.exports = router;
