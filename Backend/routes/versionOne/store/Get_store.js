const express = require("express");
const { requireSeller } = require("../../../middleware/auth/authenticate");
const { getStoreData } = require("../../../controller/StoreController");

const router = express.Router();

router.get("/", requireSeller, getStoreData);

module.exports = router;
