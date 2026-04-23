const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { createStore } = require("../../../controller/StoreController");
const {
  validateCreateStore,
  validateOwnerId,
} = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.post(
  "/",
  requireAuth,
  validateOwnerId,
  validateCreateStore,
  createStore,
);

module.exports = router;
