const express = require("express");
const getCartRoutes = require("./Get_cart");
const postCartRoutes = require("./Post_cart");
const patchCartRoutes = require("./Patch_cart");
const deleteCartRoutes = require("./Delete_cart");

const router = express.Router();

router.use("/server/cart", getCartRoutes);
router.use("/server/cart", postCartRoutes);
router.use("/server/cart", patchCartRoutes);
router.use("/server/cart", deleteCartRoutes);

module.exports = router;
