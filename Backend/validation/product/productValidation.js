/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
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
