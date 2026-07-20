// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

module.exports = {
  loginSchema,
};
