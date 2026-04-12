const express = require("express");
const { handleStripeWebhook } = require("../../../controller/WebhookController");

const router = express.Router();

router.post("/stripe", handleStripeWebhook);

module.exports = router;
