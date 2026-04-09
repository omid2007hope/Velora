const express = require("express");
const postCustomerRoutes = require("./Post_customer");

const router = express.Router();

router.use(postCustomerRoutes);

module.exports = router;
