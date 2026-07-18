const express = require("express");
const requireSeller = require("../../../middleware/auth/system/Seller");

const { patchStoreData } = require("../../../controller/StoreController");
const { validatePatchStore } = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.patch("/seller/store/:id", requireSeller, validatePatchStore, patchStoreData);

module.exports = router;
