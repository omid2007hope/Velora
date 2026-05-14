const express = require("express");
const getProductRoutes = require("./Get_products");
const postProductRoutes = require("./Post_products");
const patchProductRoutes = require("./Patch_product");

const router = express.Router();

router.use("/server", getProductRoutes);
router.use("/server", postProductRoutes);
router.use("/server", patchProductRoutes);

module.exports = router;
