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

const storeSchema = z.object({
  // ownerOfStore is injected server-side from the authenticated user (req.user.id)
  // and must never be sent by the client.
  storeName: z.string().min(2).max(120),
  storeDescription: z.string().min(2).max(500),
  countryStoreLocatedIn: z.string().min(2).max(100),
  stateOrProvinceStoreLocatedIn: z.string().max(100).optional().default(""),
  cityStoreLocatedIn: z.string().min(2).max(100),
  storeAddress: z.string().min(2).max(200),
  storeZipcode: z.string().min(2).max(20),
});

const patchStoreSchema = storeSchema.partial();

module.exports = {
  storeSchema,
  patchStoreSchema,
};
