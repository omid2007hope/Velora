// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { z } = require("zod");

const reviewCreateSchema = z.object({
  name: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});

module.exports = {
  reviewCreateSchema,
};
