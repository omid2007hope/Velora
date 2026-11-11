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
