const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { validateBody } = require("../../../middleware/validate");
const { profileSchema } = require("../../../validation/schemas");
const { CustomerDetails } = require("../../../controller/version_1/Account");

const router = express.Router();

router.post(
  "/server/customer/login/account",
  requireAuth,
  validateBody(profileSchema),
  CustomerDetails,
);

module.exports = router;
