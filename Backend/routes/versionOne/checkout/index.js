const express = require("express");
const getCheckoutRoutes = require("./Get_checkout");
const postCheckoutRoutes = require("./Post_checkout");
const patchCheckoutRoutes = require("./Patch_checkout");

const router = express.Router();

router.use("/server/checkout", getCheckoutRoutes);
router.use("/server/checkout", postCheckoutRoutes);
router.use("/server/checkout", patchCheckoutRoutes);

module.exports = router;
