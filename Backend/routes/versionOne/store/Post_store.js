const express = require("express");
const { requireAuth } = require("../../../middleware/auth/authenticate");
const { createStore } = require("../../../controller/StoreController");
const {
  validateCreateStore,
} = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.post("/", requireAuth, validateCreateStore, createStore);

module.exports = router;
