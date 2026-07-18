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
