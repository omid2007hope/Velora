const express = require("express");
const router = express.Router();

const { getAllStore } = require("../../../controller/StoreController");

router.get("/seller/store", getAllStore);

module.exports = router;
