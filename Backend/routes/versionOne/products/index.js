const express = require("express");
const getProductRoutes = require("./Get_products");
const postProductRoutes = require("./Post_products");

const router = express.Router();

router.use("/server", getProductRoutes);
router.use("/server", postProductRoutes);

module.exports = router;
