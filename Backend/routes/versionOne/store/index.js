const express = require("express");
const router = express.Router();

const postStoreRoutes = require("./Post_store");
const getStoreByOwnerRoutes = require("./Get_storeByOwner");
const getAllStoreRoutes = require("./Get_allStores");
const getStoreById = require("./Get_storeById");
const patchStoreRoutes = require("./Patch_store");
const deleteStoreRoutes = require("./Delete_store");

router.use("/server", postStoreRoutes);
router.use("/server", patchStoreRoutes);
router.use(`/server`, getStoreByOwnerRoutes);
router.use(`/server`, getStoreById);
router.use(`/server`, getAllStoreRoutes);
router.use("/server", deleteStoreRoutes);

module.exports = router;
