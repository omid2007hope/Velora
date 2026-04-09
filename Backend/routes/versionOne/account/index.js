const express = require("express");
const postAccountRoutes = require("./Post_account");

const router = express.Router();

router.use(postAccountRoutes);

module.exports = router;
