// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");

const authViewSchema = z.enum(["customer", "seller"]).optional();

const emailOnlySchema = z.object({
  email: z.string().email(),
  authView: authViewSchema,
});

module.exports = {
  authViewSchema,
  emailOnlySchema,
};
