const express = require("express");
const { requireSellerHasStore } = require("../../../middleware/auth/authenticate");
const { createStore } = require("../../../controller/StoreController");
const { validateCreateStore } = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.post("/", requireSellerHasStore, validateCreateStore, createStore);

module.exports = router;
