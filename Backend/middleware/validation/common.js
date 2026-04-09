const { createHttpError } = require("../../utils/httpError");

function formatZodError(error) {
  return error.errors.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}

function createValidator(target, schema) {
  return function validateRequest(req, _res, next) {
    const parsed = schema.safeParse(req[target]);

    if (!parsed.success) {
      return next(
        createHttpError(400, "Validation failed", formatZodError(parsed.error)),
      );
    }

    req[target] = parsed.data;
    return next();
  };
}

function validateBody(schema) {
  return createValidator("body", schema);
}

function validateQuery(schema) {
  return createValidator("query", schema);
}

function validateParams(schema) {
  return createValidator("params", schema);
}

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
};
