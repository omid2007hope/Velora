const express = require("express");
const { createReview } = require("../../../controller/version_1/Reviews");

const router = express.Router();

router.post("/server/products/:productId/reviews", createReview);

module.exports = router;
