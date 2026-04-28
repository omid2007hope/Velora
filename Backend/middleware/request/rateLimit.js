const rateLimit = require("express-rate-limit");

const isTest = process.env.NODE_ENV === "test";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isTest,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isTest,
  message: {
    error: "Too many requests. Please wait a few minutes and try again.",
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
};
