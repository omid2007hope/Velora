const express = require("express");
const getCartRoutes = require("./Get_cart");
const postCartRoutes = require("./Post_cart");
const patchCartRoutes = require("./Patch_cart");
const deleteCartRoutes = require("./Delete_cart");

const router = express.Router();

router.use(getCartRoutes);
router.use(postCartRoutes);
router.use(patchCartRoutes);
router.use(deleteCartRoutes);

module.exports = router;
