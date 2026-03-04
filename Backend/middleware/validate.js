// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
function formatZodError(error) {
  return error.errors.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
}

function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatZodError(parsed.error),
      });
    }
    req.body = parsed.data;
    return next();
  };
}

function validateQuery(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatZodError(parsed.error),
      });
    }
    req.query = parsed.data;
    return next();
  };
}

module.exports = {
  validateBody,
  validateQuery,
};
