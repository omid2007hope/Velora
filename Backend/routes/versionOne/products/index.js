const express = require("express");
const getProductRoutes = require("./Get_products");
const postProductRoutes = require("./Post_products");
const patchProductRoutes = require("./Patch_product");
const deleteProductRoutes = require("./Delete_product");

const router = express.Router();

router.use("/server", getProductRoutes);
router.use("/server", postProductRoutes);
router.use("/server", patchProductRoutes);
router.use("/server", deleteProductRoutes);

module.exports = router;
