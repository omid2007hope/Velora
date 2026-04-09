const logger = require("../../utils/logger");

function errorHandler(err, _req, res, _next) {
  if (!err?.status || err.status >= 500) {
    logger.error("Unhandled error:", err);
  } else {
    logger.warn("Handled request error:", err.message);
  }

  if (err?.status) {
    const payload = { error: err.message };

    if (err.details !== undefined) {
      payload.details = err.details;
    }

    return res.status(err.status).json(payload);
  }

  return res.status(500).json({ error: "Internal server error" });
}

module.exports = {
  errorHandler,
};
