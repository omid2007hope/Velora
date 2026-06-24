const express = require("express");
const { requireSellerHasStore } = require("../../../middleware/auth/authenticate");
const { patchStoreData } = require("../../../controller/StoreController");
const { validatePatchStore } = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.patch("/:id", requireSellerHasStore, validatePatchStore, patchStoreData);

module.exports = router;
