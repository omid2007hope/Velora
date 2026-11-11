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
