const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { getStoreData } = require("../../../controller/StoreController");

const router = express.Router();

router.get("/", requireAuth, getStoreData);

module.exports = router;
