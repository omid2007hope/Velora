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

const { createHttpError } = require("../../../utils/httpError");
const requireAuth = require("../token/authorization/Mandatory");

function requireCustomer(req, _res, next) {
  return requireAuth(req, _res, (error) => {
    if (error) {
      return next(error);
    }

    if (req.user?.role !== "customer") {
      return next(createHttpError(403, "Customer access required"));
    }

    return next();
  });
}

module.exports = requireCustomer;
