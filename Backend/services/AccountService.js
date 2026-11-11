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

const Account = require("../model/Account");
const BaseService = require("./BaseService");

module.exports = new (class AccountService extends BaseService {
  async upsertAccountProfile({ userId, phoneNumber, dateOfBirth, gender }) {
    const normalizedProfile = {
      userId,
      phoneNumber: phoneNumber.trim(),
      dateOfBirth: dateOfBirth.trim(),
      gender: gender.trim(),
    };

    const existingProfile = await this.model.findOne({ userId }).lean();

    if (existingProfile) {
      const updatedProfile = await this.update({ userId }, normalizedProfile);

      return {
        source: "updated",
        existed: true,
        data: {
          _id: updatedProfile._id,
          userId: updatedProfile.userId,
          phoneNumber: updatedProfile.phoneNumber,
          dateOfBirth: updatedProfile.dateOfBirth,
          gender: updatedProfile.gender,
        },
      };
    }

    const savedProfile = await this.createObject(normalizedProfile);

    return {
      source: "created",
      existed: false,
      data: {
        _id: savedProfile._id,
        userId: savedProfile.userId,
        phoneNumber: savedProfile.phoneNumber,
        dateOfBirth: savedProfile.dateOfBirth,
        gender: savedProfile.gender,
      },
    };
  }
})(Account);
