const asyncHandler = require("../utils/asyncHandler");
const { createHttpError } = require("../utils/httpError");
const customerService = require("../services/CustomerService");

const createCustomer = asyncHandler(async (req, res) => {
  const result = await customerService.registerCustomer(req.body);

  return res.status(201).json({
    _id: result?.data?._id,
    ...result,
  });
});

const loginCustomer = asyncHandler(async (req, res) => {
  const result = await customerService.loginCustomer(req.body);

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

const refreshCustomerToken = asyncHandler(async (req, res) => {
  try {
    const token = await customerService.refreshAccessToken(req.body.refreshToken);
    return res.status(200).json({ token });
  } catch (_error) {
    throw createHttpError(401, "Invalid or expired refresh token");
  }
});

const requestCustomerEmailVerification = asyncHandler(async (req, res) => {
  const result = await customerService.requestEmailVerification(req.body.email);

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

const confirmCustomerEmailVerification = asyncHandler(async (req, res) => {
  const result = await customerService.confirmEmailVerification(req.body.token);

  if (!result.ok) {
    throw createHttpError(400, "Invalid or expired token");
  }

  return res.status(200).json({
    message: "Email verified successfully",
    email: result.email,
  });
});

const requestCustomerPasswordReset = asyncHandler(async (req, res) => {
  const result = await customerService.requestPasswordReset(
    req.body.email,
    req.body.newPassword,
  );

  return res.status(200).json({
    message:
      "If an account exists for this email, a password reset link has been sent.",
    token: result.token,
  });
});

const confirmCustomerPasswordReset = asyncHandler(async (req, res) => {
  const result = await customerService.confirmPasswordReset(req.body.token);

  if (!result.ok) {
    throw createHttpError(400, "Invalid or expired token");
  }

  return res.status(200).json({
    message: "Password updated successfully",
    email: result.email,
  });
});

module.exports = {
  createCustomer,
  loginCustomer,
  refreshCustomerToken,
  requestCustomerEmailVerification,
  confirmCustomerEmailVerification,
  requestCustomerPasswordReset,
  confirmCustomerPasswordReset,
};
