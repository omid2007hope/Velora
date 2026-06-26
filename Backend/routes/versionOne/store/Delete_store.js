const express = require("express");
const requireSellerHasStore = require("../../../middleware/auth/system/StoreOwner");

const { deleteStore } = require("../../../controller/StoreController");

const router = express.Router();

router.delete("/:id", requireSellerHasStore, deleteStore);

module.exports = router;
