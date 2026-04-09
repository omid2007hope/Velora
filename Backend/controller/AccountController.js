const asyncHandler = require("../utils/asyncHandler");
const accountService = require("../services/AccountService");
const { createHttpError } = require("../utils/httpError");

const createAccountProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw createHttpError(401, "Unauthorized");
  }

  const result = await accountService.upsertAccountProfile({
    userId,
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
