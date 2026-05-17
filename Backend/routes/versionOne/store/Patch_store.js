const express = require("express");
const { requireSeller } = require("../../../middleware/auth/authenticate");
const { patchStoreData } = require("../../../api/controller/StoreController");
const {
  validatePatchStore,
} = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.patch("/:id", requireSeller, validatePatchStore, patchStoreData);

module.exports = router;

