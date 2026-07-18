const express = require("express");
const router = express.Router();

const { getStoreById } = require("../../../controller/StoreController");

router.get("/", getStoreById);

module.exports = router;
