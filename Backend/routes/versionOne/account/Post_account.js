const express = require("express");
const { requireAuth } = require("../../../middleware/auth");
const { createAccountProfile } = require("../../../controller/AccountController");
const {
  validateCreateAccountProfile,
} = require("../../../middleware/validation/AccountValidation");

const router = express.Router();

router.post(
  "/server/customer/login/account",
  requireAuth,
  validateCreateAccountProfile,
  createAccountProfile,
);

module.exports = router;
