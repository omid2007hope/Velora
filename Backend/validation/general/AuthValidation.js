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
