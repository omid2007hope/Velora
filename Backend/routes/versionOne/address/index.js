const express = require("express");
const postAddressRoutes = require("./Post_address");

const router = express.Router();

router.use(postAddressRoutes);

module.exports = router;
