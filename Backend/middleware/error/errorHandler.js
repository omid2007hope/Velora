const logger = require("../../utils/logger");
const { createHttpError } = require("../../utils/httpError");

function normalizeKnownError(err) {
  if (!err) {
    return err;
  }

  if (err.status) {
    return err;
  }

  if (err.code === 11000) {
    const duplicatedFields = Object.keys(err.keyPattern || {});
    const message =
      duplicatedFields.length === 1
        ? `${duplicatedFields[0]} already exists`
        : "Resource with these unique fields already exists";

    return createHttpError(409, message, {
      keyPattern: err.keyPattern,
      keyValue: err.keyValue,
    });
  }

  if (err.name === "ValidationError") {
    const details = Object.values(err.errors || {}).map((validationError) => ({
      path: validationError.path,
      message: validationError.message,
    }));

    return createHttpError(400, "Validation failed", details);
  }

  if (err.name === "CastError") {
    return createHttpError(400, `Invalid ${err.path}`);
  }

  return err;
}

function errorHandler(err, _req, res, _next) {
  const normalizedError = normalizeKnownError(err);

  if (!normalizedError?.status || normalizedError.status >= 500) {
    logger.error("Unhandled error:", normalizedError);
  } else {
    logger.warn("Handled request error:", normalizedError.message);
  }

  if (normalizedError?.status) {
    const payload = { error: normalizedError.message };

    if (normalizedError.details !== undefined) {
      payload.details = normalizedError.details;
    }

    return res.status(normalizedError.status).json(payload);
  }

  return res.status(500).json({ error: "Internal server error" });
}

module.exports = {
  errorHandler,
};
