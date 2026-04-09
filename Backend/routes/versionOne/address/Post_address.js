const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { validateBody } = require("../../../middleware/validate");
const { addressSchema } = require("../../../validation/schemas");
const { CustomerAddress } = require("../../../controller/version_1/Address");

const router = express.Router();

router.post(
  "/server/customer/login/account/address",
  requireAuth,
  validateBody(addressSchema),
  CustomerAddress,
);

module.exports = router;
