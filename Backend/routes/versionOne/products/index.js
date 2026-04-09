const express = require("express");
const getProductRoutes = require("./Get_products");
const postProductRoutes = require("./Post_products");

const router = express.Router();

router.use(getProductRoutes);
router.use(postProductRoutes);

module.exports = router;
