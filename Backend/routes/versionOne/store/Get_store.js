const express = require("express");
const { requireSellerHasStore } = require("../../../middleware/auth/authenticate");
const { getStoreData } = require("../../../controller/StoreController");

const router = express.Router();

router.get("/", requireSellerHasStore, getStoreData);

module.exports = router;
