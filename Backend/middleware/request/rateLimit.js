// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
