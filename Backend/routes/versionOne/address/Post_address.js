const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { createAddress } = require("../../../controller/AddressController");
const {
  validateCreateAddress,
} = require("../../../middleware/validation/AddressValidation");

const router = express.Router();

router.post(
  "/server/customer/login/account/address",
  requireAuth,
  validateCreateAddress,
  createAddress,
);

module.exports = router;
