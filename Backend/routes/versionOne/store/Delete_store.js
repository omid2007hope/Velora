const express = require("express");
const requireSeller = require("../../../middleware/auth/system/Seller");

const { deleteStore } = require("../../../controller/StoreController");
const { validateStoreId } = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.delete("/seller/store/:id", requireSeller, validateStoreId, deleteStore);

module.exports = router;
