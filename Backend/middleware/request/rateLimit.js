const rateLimit = require("express-rate-limit");

function isRateLimitEnabled() {
  if (process.env.RATE_LIMIT_ENABLED !== undefined) {
    return String(process.env.RATE_LIMIT_ENABLED).toLowerCase() === "true";
  }

  return process.env.NODE_ENV === "production";
}

const skipRateLimit = () => !isRateLimitEnabled();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.API_RATE_LIMIT_MAX) || 200,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimit,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.AUTH_RATE_LIMIT_MAX) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimit,
  message: {
    error: "Too many requests. Please wait a few minutes and try again.",
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
};
