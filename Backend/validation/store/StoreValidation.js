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
