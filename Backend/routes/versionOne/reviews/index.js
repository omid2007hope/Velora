const express = require("express");
const getReviewRoutes = require("./Get_reviews");
const postReviewRoutes = require("./Post_reviews");

const router = express.Router();

router.use("/server", getReviewRoutes);
router.use("/server", postReviewRoutes);

module.exports = router;
