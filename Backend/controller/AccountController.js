const asyncHandler = require("../utils/asyncHandler");
const accountService = require("../services/AccountService");
const getAuthorizedUserId = require("../utils/getAuthorizedUserId");

const createAccountProfile = asyncHandler(async (req, res) => {
  const result = await accountService.upsertAccountProfile({
    userId: getAuthorizedUserId(req),
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
