const express = require("express");
const postAccountRoutes = require("./Post_store");
const getAccountRoutes = require("./Get_store");

const router = express.Router();
router.use("/server/seller/store", postAccountRoutes);
router.use("/server/seller/store/:id", getAccountRoutes);

module.exports = router;
