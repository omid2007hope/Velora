// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");
const mongoose = require("mongoose");

const objectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

const objectIdParamsSchema = z.object({
  id: objectId,
});

const tokenOnlySchema = z.object({
  token: z.string().min(10),
});

module.exports = {
  objectId,
  objectIdParamsSchema,
  tokenOnlySchema,
};
