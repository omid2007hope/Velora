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
const getProductRoutes = require("./Get_products");
const listProductsByStoreIdRoutes = require("./Get_productByStoreId");
const getProductByIdRoutes = require("./Get_productById");
const postProductRoutes = require("./Post_products");
const patchProductRoutes = require("./Patch_product");
const deleteProductRoutes = require("./Delete_product");

const router = express.Router();

router.use("/server", getProductRoutes);
router.use("/server", listProductsByStoreIdRoutes);
router.use("/server", getProductByIdRoutes);
router.use("/server", postProductRoutes);
router.use("/server", patchProductRoutes);
router.use("/server", deleteProductRoutes);

module.exports = router;
