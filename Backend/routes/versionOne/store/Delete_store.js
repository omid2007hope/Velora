const express = require("express");
const { requireSeller } = require("../../../middleware/auth/authenticate");
const { deleteStore } = require("../../../api/controller/StoreController");

const router = express.Router();

router.delete("/:id", requireSeller, deleteStore);

module.exports = router;

