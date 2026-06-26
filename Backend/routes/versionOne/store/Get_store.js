const express = require("express");

const { getStoreData } = require("../../../controller/StoreController");

const router = express.Router();

router.get("/", getStoreData);

module.exports = router;
