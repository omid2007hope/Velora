const express = require("express");
const requireSeller = require("../../../middleware/auth/system/Seller");

const { listStoreByOwnerId } = require("../../../controller/StoreController");

const router = express.Router();

router.get("/", requireSeller, listStoreByOwnerId);

module.exports = router;
