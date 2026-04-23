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
