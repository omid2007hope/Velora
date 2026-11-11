/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
