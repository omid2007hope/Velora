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

const asyncHandler = require("../utils/asyncHandler");
const addressService = require("../services/AddressService");

const createAddress = asyncHandler(async (req, res) => {
  const result = await addressService.createAddress({
    userId: req.user.id,
    country: req.body.country,
    city: req.body.city,
    street: req.body.street,
    postalCode: req.body.postalCode,
  });

  return res.status(result.existed ? 200 : 201).json({
    _id: result?.data?._id,
    ...result,
  });
});

module.exports = {
  createAddress,
};
