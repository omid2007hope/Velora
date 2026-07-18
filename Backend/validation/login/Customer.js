// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");
const { authViewSchema } = require("../general/AuthValidation");

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const passwordResetRequestSchema = z.object({
  email: z.string().email(),
  authView: authViewSchema,
});

const passwordResetConfirmSchema = z.object({
  token: z.string().min(10),
  newPassword: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[!@#$%^&*()[\]{};:'"\\|,.<>/?`~+\-=]/, "Must include a symbol"),
});

module.exports = {
  loginSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
};
