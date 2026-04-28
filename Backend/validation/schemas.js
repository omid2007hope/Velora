// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");
const mongoose = require("mongoose");
const { createHttpError } = require("../utils/httpError");

const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

const authViewSchema = z.enum(["customer", "seller"]).optional();

const storeSchema = z.object({
  // ownerOfStore is injected server-side from the authenticated user (req.user.id)
  // and must never be sent by the client.
  storeName: z.string().min(2).max(120),
  storeDescription: z.string().min(2).max(500),
  countryStoreLocatedIn: z.string().min(2).max(100),
  stateOrProvinceStoreLocatedIn: z.string().max(100).optional().default(""),
  cityStoreLocatedIn: z.string().min(2).max(100),
  storeAddress: z.string().min(2).max(200),
  storeZipcode: z.string().min(2).max(20),
});

// function validateOwnerId(req, _res, next) {
//   const ownerId = req.body?.ownerOfStore;

//   if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
//     return next(createHttpError(400, "ownerOfStore must be a valid ObjectId"));
//   }

//   return next();
// }

const registerSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  authView: authViewSchema,
});

const storeOwnerRegisterSchema = z.object({
  storeOwnerName: z.string().min(2).max(120),
  storeOwnerEmailAddress: z.string().email(),
  storeOwnerPassword: z.string().min(8).max(128),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const storeOwnerLoginSchema = z.object({
  storeOwnerEmailAddress: z.string().email(),
  storeOwnerPassword: z.string().min(8).max(128),
});

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
      }),
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

const tokenOnlySchema = z.object({
  token: z.string().min(10),
});

const emailOnlySchema = z.object({
  email: z.string().email(),
  authView: authViewSchema,
});

const productCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  newPrice: z.number().nonnegative().optional(),
  oldPrice: z.number().nonnegative().optional(),
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

const objectIdParamsSchema = z.object({
  id: objectId,
});

const productIdParamsSchema = z.object({
  productId: objectId,
});

const reviewCreateSchema = z.object({
  name: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});

const orderStatusSchema = z
  .object({
    orderStatus: z
      .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
      .optional(),
  })
  .refine((value) => value.orderStatus, {
    message: "orderStatus must be provided",
    path: ["orderStatus"],
  });

module.exports = {
  objectIdParamsSchema,
  registerSchema,
  storeOwnerRegisterSchema,
  loginSchema,
  storeOwnerLoginSchema,
  addressSchema,
  profileSchema,
  cartItemSchema,
  updateQuantitySchema,
  orderSchema,
  paymentMethodSchema,
  refreshSchema,
  removeItemSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
  tokenOnlySchema,
  emailOnlySchema,
  productCreateSchema,
  productIdParamsSchema,
  reviewCreateSchema,
  orderStatusSchema,
  storeSchema,
  // validateOwnerId,
};
