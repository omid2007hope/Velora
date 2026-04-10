const asyncHandler = require("../utils/asyncHandler");
const { createHttpError } = require("../utils/httpError");
const storeOwnerService = require("../services/StoreOwnerService");

const createStoreOwner = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.registerStoreOwner(req.body);

  return res.status(201).json({
    _id: result?.data?._id,
    ...result,
  });
});

const loginStoreOwner = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.loginStoreOwner(req.body);

  if (!result?.authenticated) {
    throw createHttpError(401, "Invalid email or password");
  }

  return res.status(200).json({
    message: "Login successful",
    token: result.token,
    refreshToken: result.refreshToken,
    data: result.data,
  });
});

const refreshStoreOwnerToken = asyncHandler(async (req, res) => {
  try {
    const token = await storeOwnerService.refreshAccessToken(req.body.refreshToken);
    return res.status(200).json({ token });
  } catch (_error) {
    throw createHttpError(401, "Invalid or expired refresh token");
  }
});

const requestStoreOwnerEmailVerification = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.requestEmailVerification(req.body.email);

  if (result.status === "already-verified") {
    return res.status(200).json({
      message: "Email is already verified.",
    });
  }

  return res.status(200).json({
    message:
      "If an account exists for this email, a verification link has been sent.",
    token: result.token,
  });
});

const confirmStoreOwnerEmailVerification = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.confirmEmailVerification(req.body.token);

  if (!result.ok) {
    throw createHttpError(400, "Invalid or expired token");
  }

  return res.status(200).json({
    message: "Email verified successfully",
    email: result.email,
  });
});

const requestStoreOwnerPasswordReset = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.requestPasswordReset(
    req.body.email,
    req.body.newPassword,
  );

  return res.status(200).json({
    message:
      "If an account exists for this email, a password reset link has been sent.",
    token: result.token,
  });
});

const confirmStoreOwnerPasswordReset = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.confirmPasswordReset(req.body.token);

  if (!result.ok) {
    throw createHttpError(400, "Invalid or expired token");
  }

  return res.status(200).json({
    message: "Password updated successfully",
    email: result.email,
  });
});

module.exports = {
  createStoreOwner,
  loginStoreOwner,
  refreshStoreOwnerToken,
  requestStoreOwnerEmailVerification,
  confirmStoreOwnerEmailVerification,
  requestStoreOwnerPasswordReset,
  confirmStoreOwnerPasswordReset,
};
