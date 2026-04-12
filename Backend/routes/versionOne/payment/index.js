const express = require("express");
const postPaymentRoutes = require("./Post_payment");

const router = express.Router();

router.use("/server/customer/login/account/payment", postPaymentRoutes);

module.exports = router;
