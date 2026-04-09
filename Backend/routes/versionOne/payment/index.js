const express = require("express");
const postPaymentRoutes = require("./Post_payment");

const router = express.Router();

router.use(postPaymentRoutes);

module.exports = router;
