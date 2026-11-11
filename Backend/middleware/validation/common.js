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
