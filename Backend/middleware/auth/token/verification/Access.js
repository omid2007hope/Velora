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

const jwt = require("jsonwebtoken");
const { createHttpError } = require("../../../../utils/httpError");

function verifyAccessToken(token) {
  if (!process.env.JWT_SECRET) {
    throw createHttpError(500, "JWT_SECRET is not set");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (payload.tokenType && payload.tokenType !== "access") {
    throw createHttpError(401, "Invalid token type");
  }

  return payload;
}

module.exports = verifyAccessToken;
