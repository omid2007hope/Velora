const express = require("express");
const { requireSellerHasStore } = require("../../../middleware/auth/authenticate");
const { deleteStore } = require("../../../controller/StoreController");

const router = express.Router();

router.delete("/:id", requireSellerHasStore, deleteStore);

module.exports = router;
