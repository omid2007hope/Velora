const express = require("express");
const postWebhookRoutes = require("./Post_webhook");

const router = express.Router();

router.use("/server/webhook", postWebhookRoutes);

module.exports = router;
