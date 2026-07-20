// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");
const { authViewSchema } = require("../general/AuthValidation");

const storeOwnerLoginSchema = z.object({
  storeOwnerEmailAddress: z.string().email(),
  storeOwnerPassword: z.string().min(8).max(128),
});

const passwordSchema = z
  .string()
  .min(8)
  .max(128)
  .regex(/[A-Z]/, "Must include an uppercase letter")
  .regex(/[a-z]/, "Must include a lowercase letter")
  .regex(/[0-9]/, "Must include a number")
  .regex(/[!@#$%^&*()[\]{};:'"\\|,.<>/?`~+\-=]/, "Must include a symbol");

const passwordResetRequestSchema = z.object({
  email: z.string().email(),
  newPassword: passwordSchema.optional(),
  authView: authViewSchema,
});

const passwordResetConfirmSchema = z.object({
  token: z.string().min(10),
  newPassword: passwordSchema.optional(),
});

module.exports = {
  storeOwnerLoginSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
};
