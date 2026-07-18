// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");
const mongoose = require("mongoose");
const { createHttpError } = require("../../utils/httpError");

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
