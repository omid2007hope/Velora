const express = require("express");
const postAddressRoutes = require("./Post_address");

const router = express.Router();

router.use("/server/customer/login/account/address", postAddressRoutes);

module.exports = router;
