// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");

const authViewSchema = z.enum(["customer", "seller"]).optional();

const emailOnlySchema = z.object({
  email: z.string().email(),
  authView: authViewSchema,
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
  authViewSchema,
  emailOnlySchema,
  passwordSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
};
