const express = require("express");
const router = express.Router();

const postStoreRoutes = require("./Post_store");
const getStoreByOwnerRoutes = require("./Get_storeByOwner");
const getAllStoreRoutes = require("./Get_allStores");
const patchStoreRoutes = require("./Patch_store");
const deleteStoreRoutes = require("./Delete_store");

router.use("/server/seller/store", postStoreRoutes);
router.use("/server/seller/store", patchStoreRoutes);
router.use(`/server/seller/store/:id`, getStoreByOwnerRoutes);
router.use(`/server/seller/store`, getAllStoreRoutes);
router.use("/server/seller/store", deleteStoreRoutes);

module.exports = router;
