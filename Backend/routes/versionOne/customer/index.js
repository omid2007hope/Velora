const express = require("express");
const postCustomerRoutes = require("./Post_customer");

const router = express.Router();

router.use("/server/customer", postCustomerRoutes);

module.exports = router;
