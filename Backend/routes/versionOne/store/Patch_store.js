const express = require("express");
const { requireSeller } = require("../../../middleware/auth/authenticate");
const { patchStoreData } = require("../../../controller/StoreController");
const {
  validatePatchStore,
} = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.patch("/", requireSeller, validatePatchStore, patchStoreData);

module.exports = router;
