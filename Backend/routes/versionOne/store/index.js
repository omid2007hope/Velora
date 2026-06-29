const express = require("express");
const postStoreRoutes = require("./Post_store");
const getStoreRoutes = require("./Get_store");
const getStoreByOwnerRoutes = require("./Get_storeByOwner");
const patchStoreRoutes = require("./Patch_store");
const deleteStoreRoutes = require("./Delete_store");

const router = express.Router();

router.use("/server/seller/store", postStoreRoutes);
router.use("/server/seller/store", patchStoreRoutes);
router.use("/server/seller/store", getStoreRoutes);
router.use(`/server/seller/store/${id}`, getStoreByOwnerRoutes);
router.use("/server/seller/store", deleteStoreRoutes);

module.exports = router;
