const express = require("express");
const postStoreOwnerRoutes = require("./Post_storeOwner");

const router = express.Router();

router.use(postStoreOwnerRoutes);

module.exports = router;
