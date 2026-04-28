const express = require("express");
const postStoreRoutes = require("./Post_store");
const getStoreRoutes = require("./Get_store");

const router = express.Router();
router.use("/server/seller/store", postStoreRoutes);
router.use("/server/seller/store", getStoreRoutes);

module.exports = router;
