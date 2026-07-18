const express = require("express");
const router = express.Router();

const { getStoreById } = require("../../../controller/StoreController");
const objectIdParamsSchema = require("../../../validation/general/GeneralValidation");

router.get(`/seller/public/store/:id`, objectIdParamsSchema, getStoreById);

module.exports = router;
