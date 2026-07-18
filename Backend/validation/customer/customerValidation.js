// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");
const { objectId } = require("../general/GeneralValidation");

const addressSchema = z.object({
  country: z.string().min(2),
  city: z.string().min(2),
  street: z.string().min(2),
  postalCode: z.string().min(3),
});

const profileSchema = z.object({
  phoneNumber: z.string().min(6).max(32),
  dateOfBirth: z.string().min(4),
  gender: z.string().min(1),
});

const cartItemSchema = z.object({
  productId: objectId,
  quantity: z.number().int().positive().default(1),
  variant: z
    .object({
      selectedColor: z.string().optional(),
      selectedSize: z.string().optional(),
    })
    .optional(),
});

const updateQuantitySchema = z.object({
  itemId: objectId,
  quantity: z.number().int().positive(),
});

const removeItemSchema = z.object({
  itemId: objectId,
});

const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: objectId,
        quantity: z.number().int().positive().default(1),
        selectedColor: z.string().optional(),
        selectedSize: z.string().optional(),
      })
    )
    .min(1, "Order items are required"),
  currency: z
    .string()
    .length(3)
    .transform((v) => v.toUpperCase())
    .default("USD"),
  addressSnapshot: z.object({
    street: z.string().min(2),
    country: z.string().min(2),
    city: z.string().min(2),
    postalCode: z.string().min(3),
  }),
});

const paymentMethodSchema = z.object({
  paymentMethodId: z.string().min(5),
  billingName: z.string().min(2).optional(),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

const orderStatusSchema = z
  .object({
    orderStatus: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]).optional(),
  })
  .refine((value) => value.orderStatus, {
    message: "orderStatus must be provided",
    path: ["orderStatus"],
  });

module.exports = {
  addressSchema,
  profileSchema,
  cartItemSchema,
  updateQuantitySchema,
  removeItemSchema,
  orderSchema,
  paymentMethodSchema,
  refreshSchema,
  orderStatusSchema,
};
