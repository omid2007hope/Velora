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
