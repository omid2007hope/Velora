const express = require("express");
const router = express.Router();

const { getStoreById } = require("../../../controller/StoreController");
const { validateStoreId } = require("../../../middleware/validation/StoreValidation");

router.get(`/seller/public/store/:id`, validateStoreId, getStoreById);

module.exports = router;
