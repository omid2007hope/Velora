const express = require("express");
const postWebhookRoutes = require("./Post_webhook");

const router = express.Router();

router.use(postWebhookRoutes);

module.exports = router;
