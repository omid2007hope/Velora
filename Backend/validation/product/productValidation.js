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
  objectId,
  productIdParamsSchema,
  productCreateSchema,
  patchProductSchema,
};
