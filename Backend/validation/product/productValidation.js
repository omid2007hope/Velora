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
const { objectId } = require("../general/GeneralValidation");

const productIdParamsSchema = z.object({
  productId: objectId,
});

const productCreateSchema = z.object({
  storeId: objectId,
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative().optional(),
  newPrice: z.number().nonnegative().optional(),
  oldPrice: z.number().nonnegative(),
  discount: z.string().optional(),
  category: z.string().min(1),
  subCategory: z.string().optional(),
  imageUrl: z
    .string()
    .url()
    .refine((value) => /^https?:\/\//i.test(value), {
      message: "imageUrl must be an http or https URL",
    }),
});

// ! ....
// ! Patch Product Validation
// ! ....

const patchProductSchema = productCreateSchema.partial();

module.exports = {
  productIdParamsSchema,
  productCreateSchema,
  patchProductSchema,
};
