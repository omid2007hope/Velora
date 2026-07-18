const express = require("express");
const requireSeller = require("../../../middleware/auth/system/Seller");

const { createStore } = require("../../../controller/StoreController");
const { validateCreateStore } = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.post("/seller/store", requireSeller, validateCreateStore, createStore);

module.exports = router;
