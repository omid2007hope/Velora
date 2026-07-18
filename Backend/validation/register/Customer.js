// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");
const { authViewSchema } = require("../general/AuthValidation");

const registerSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  authView: authViewSchema,
});

module.exports = {
  registerSchema,
};
