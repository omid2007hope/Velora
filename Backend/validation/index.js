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

const generalValidation = require("./general/GeneralValidation");
const authValidation = require("./general/AuthValidation");
const customerValidation = require("./customer/customerValidation");
const registerCustomerValidation = require("./register/Customer");
const registerSellerValidation = require("./register/Seller");
const loginCustomerValidation = require("./login/Customer");
const loginSellerValidation = require("./login/Seller");
const storeValidation = require("./store/StoreValidation");
const productValidation = require("./product/productValidation");
const reviewValidation = require("./review/reviewValidation");

module.exports = {
  ...generalValidation,
  ...authValidation,
  ...customerValidation,
  ...registerCustomerValidation,
  ...registerSellerValidation,
  ...loginCustomerValidation,
  ...loginSellerValidation,
  ...storeValidation,
  ...productValidation,
  ...reviewValidation,
};
