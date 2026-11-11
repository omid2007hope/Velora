/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
