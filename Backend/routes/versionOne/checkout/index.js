const express = require("express");
const getCheckoutRoutes = require("./Get_checkout");
const postCheckoutRoutes = require("./Post_checkout");
const patchCheckoutRoutes = require("./Patch_checkout");

const router = express.Router();

router.use(getCheckoutRoutes);
router.use(postCheckoutRoutes);
router.use(patchCheckoutRoutes);

module.exports = router;
