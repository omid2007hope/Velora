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

// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");

const storeOwnerRegisterSchema = z.object({
  storeOwnerName: z.string().min(2).max(120),
  storeOwnerEmailAddress: z.string().email(),
  storeOwnerPassword: z.string().min(8).max(128),
});

module.exports = {
  storeOwnerRegisterSchema,
};
