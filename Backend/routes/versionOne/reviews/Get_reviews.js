const express = require("express");
const { listReviews } = require("../../../controller/version_1/Reviews");

const router = express.Router();

router.get("/server/products/:productId/reviews", listReviews);

module.exports = router;
