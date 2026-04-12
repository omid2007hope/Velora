const express = require("express");
const postAccountRoutes = require("./Post_account");

const router = express.Router();

router.use("/server/customer/login/account", postAccountRoutes);

module.exports = router;
