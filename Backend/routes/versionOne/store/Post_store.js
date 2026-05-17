const express = require("express");
const { requireSeller } = require("../../../middleware/auth/authenticate");
const { createStore } = require("../../../api/controller/StoreController");
const {
  validateCreateStore,
} = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.post("/", requireSeller, validateCreateStore, createStore);

module.exports = router;

