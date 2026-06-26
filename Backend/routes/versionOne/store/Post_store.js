const express = require("express");

const { createStore } = require("../../../controller/StoreController");
const { validateCreateStore } = require("../../../middleware/validation/StoreValidation");

const router = express.Router();

router.post("/", validateCreateStore, createStore);

module.exports = router;
