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
