const express = require("express");
const { handleStripeWebhook } = require("../../../controller/version_1/Webhook");

const router = express.Router();

router.post("/server/webhook/stripe", handleStripeWebhook);

module.exports = router;
