const express = require("express");
const getReviewRoutes = require("./Get_reviews");
const postReviewRoutes = require("./Post_reviews");

const router = express.Router();

router.use(getReviewRoutes);
router.use(postReviewRoutes);

module.exports = router;
