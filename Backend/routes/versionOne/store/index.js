const express = require("express");
const postAccountRoutes = require("./Post_store");

const router = express.Router();
router.use("/server/seller/store", postAccountRoutes);

module.exports = router;
