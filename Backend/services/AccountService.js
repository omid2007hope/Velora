const Account = require("../model/Account");

async function upsertAccountProfile({ userId, phoneNumber, dateOfBirth, gender }) {
  const normalizedProfile = {
    userId,
    phoneNumber: phoneNumber.trim(),
    dateOfBirth: dateOfBirth.trim(),
    gender: gender.trim(),
  };

  const existingProfile = await Account.findOne({ userId }).lean();

  if (existingProfile) {
    const updatedProfile = await Account.findOneAndUpdate(
      { userId },
      normalizedProfile,
      { returnDocument: "after", runValidators: true },
    ).lean();

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

  const savedProfile = await new Account(normalizedProfile).save();

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

module.exports = {
  upsertAccountProfile,
};
