const express = require("express");
const requireSeller = require("../../../middleware/auth/system/Seller");

const { deleteStore } = require("../../../controller/StoreController");

const router = express.Router();

router.delete("/:id", requireSeller, deleteStore);

module.exports = router;
