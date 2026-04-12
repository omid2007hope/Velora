const express = require("express");
const postStoreOwnerRoutes = require("./Post_storeOwner");

const router = express.Router();

router.use("/server/store-owner", postStoreOwnerRoutes);

module.exports = router;
