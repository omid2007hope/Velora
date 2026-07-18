const express = require("express");
const router = express.Router();

const { getStoreById } = require("../../../controller/StoreController");

router.get("/seller/public/store/:id", getStoreById);

module.exports = router;
