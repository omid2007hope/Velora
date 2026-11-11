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
