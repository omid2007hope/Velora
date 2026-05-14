const express = require("express");
const { requireSeller } = require("../../../middleware/auth/authenticate");
const { deleteStore } = require("../../../controller/StoreController");

const router = express.Router();

router.patch("/:id", requireSeller, deleteStore);

module.exports = router;
