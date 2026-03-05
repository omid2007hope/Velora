// Centralized rate limiting configuration
// Uses IP-based limiting to slow brute force and credential stuffing attempts.
const rateLimit = require("express-rate-limit");

// Intended for login + token refresh endpoints.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please wait a few minutes and try again.",
  },
});

module.exports = {
  authLimiter,
};
