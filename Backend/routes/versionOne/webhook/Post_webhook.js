const express = require("express");
const { handleStripeWebhook } = require("../../../controller/WebhookController");

const router = express.Router();

router.post("/server/webhook/stripe", handleStripeWebhook);

module.exports = router;
