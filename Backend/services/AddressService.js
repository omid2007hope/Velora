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

const Address = require("../model/Address");
const BaseService = require("./BaseService");

module.exports = new (class AddressService extends BaseService {
  async createAddress({ userId, country, city, street, postalCode }) {
    const normalizedAddress = {
      userId,
      country: String(country).toLowerCase().trim(),
      city: String(city).toLowerCase().trim(),
      street: String(street).toLowerCase().trim(),
      postalCode: String(postalCode).toLowerCase().trim(),
    };

    const existingAddress = await this.model.findOne(normalizedAddress).lean();

    if (existingAddress) {
      return {
        source: "database",
        existed: true,
        data: {
          _id: existingAddress._id,
          userId: existingAddress.userId,
          country: existingAddress.country,
          city: existingAddress.city,
          street: existingAddress.street,
          postalCode: existingAddress.postalCode,
        },
      };
    }

    const savedAddress = await this.createObject(normalizedAddress);

    return {
      source: "created",
      existed: false,
      data: {
        _id: savedAddress._id,
        userId: savedAddress.userId,
        country: savedAddress.country,
        city: savedAddress.city,
        street: savedAddress.street,
        postalCode: savedAddress.postalCode,
      },
    };
  }
})(Address);
