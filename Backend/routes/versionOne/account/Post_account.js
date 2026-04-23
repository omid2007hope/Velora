const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const {
  createAccountProfile,
} = require("../../../controller/AccountController");
const {
  validateCreateAccountProfile,
} = require("../../../middleware/validation/AccountValidation");

const router = express.Router();

router.post(
  "/",
  requireAuth,
  validateCreateAccountProfile,
  createAccountProfile,
);

module.exports = router;
