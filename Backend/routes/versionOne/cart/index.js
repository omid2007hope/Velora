// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
 */

const express = require("express");
const getCartRoutes = require("./Get_cart");
const postCartRoutes = require("./Post_cart");
const patchCartRoutes = require("./Patch_cart");
const deleteCartRoutes = require("./Delete_cart");

const router = express.Router();

router.use("/server/cart", getCartRoutes);
router.use("/server/cart", postCartRoutes);
router.use("/server/cart", patchCartRoutes);
router.use("/server/cart", deleteCartRoutes);

module.exports = router;
