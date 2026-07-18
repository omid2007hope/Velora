const asyncHandler = require("../utils/asyncHandler");
const accountService = require("../services/AccountService");

const createAccountProfile = asyncHandler(async (req, res) => {
  const result = await accountService.upsertAccountProfile({
    userId: req.user.id,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
  });

  return res.status(result.existed ? 200 : 201).json({
    _id: result?.data?._id,
    ...result,
  });
});

module.exports = {
  createAccountProfile,
};
