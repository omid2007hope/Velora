const asyncHandler = require('../utils/asyncHandler');
const { createHttpError } = require('../utils/httpError');
const storeOwnerService = require('../services/StoreOwnerService');

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * POST /sellers/register
 * Creates a new store owner (seller) account.
 * Returns 201 with the created (or already-existing) seller record.
 */
const createStoreOwner = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.registerStoreOwner(req.body);

  return res.status(201).json({
    source: result.source,
    existed: result.existed,
    data: result.data,
    emailSent: result.emailSent,
    emailVerificationToken: result.emailVerificationToken,
  });
});

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * POST /sellers/login
 * Authenticates a store owner and returns JWT access + refresh tokens.
 * Responds with 401 if credentials are invalid.
 */
const loginStoreOwner = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.loginStoreOwner(req.body);

  if (!result?.authenticated) {
    throw createHttpError(401, 'Invalid email or password');
  }

  return res.status(200).json({
    message: 'Login successful',
    token: result.token,
    refreshToken: result.refreshToken,
    data: result.data,
  });
});

// ─── Token Refresh ────────────────────────────────────────────────────────────

/**
 * POST /sellers/refresh-token
 * Accepts a valid refresh token and returns a new short-lived access token.
 * Responds with 401 if the refresh token is invalid or expired.
 */
const refreshStoreOwnerToken = asyncHandler(async (req, res) => {
  try {
    const token = await storeOwnerService.refreshAccessToken(req.body.refreshToken);
    return res.status(200).json({ token });
  } catch (_error) {
    throw createHttpError(401, 'Invalid or expired refresh token');
  }
});

// ─── Email Verification ───────────────────────────────────────────────────────

/**
 * POST /sellers/request-email-verification
 * Sends (or re-sends) a verification email to the given address.
 * Always returns 200 to avoid email enumeration attacks.
 */
const requestStoreOwnerEmailVerification = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.requestEmailVerification(req.body.email);

  if (result.status === 'already-verified') {
    return res.status(200).json({ message: 'Email is already verified.' });
  }

  return res.status(200).json({
    message: 'If an account exists for this email, a verification link has been sent.',
    token: result.token,       // undefined in production
    emailSent: result.emailSent,
  });
});

/**
 * POST /sellers/confirm-email-verification
 * Validates the verification token and marks the account as verified.
 * Responds with 400 if the token is missing, invalid, or expired.
 */
const confirmStoreOwnerEmailVerification = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.confirmEmailVerification(req.body.token);

  if (!result.ok) {
    throw createHttpError(400, 'Invalid or expired token');
  }

  return res.status(200).json({
    message: 'Email verified successfully',
    email: result.email,
  });
});

// ─── Password Reset ───────────────────────────────────────────────────────────

/**
 * POST /sellers/request-password-reset
 * Sends a password-reset email to the given address.
 * Always returns 200 to avoid email enumeration attacks.
 */
const requestStoreOwnerPasswordReset = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.requestPasswordReset(
    req.body.email,
    req.body.newPassword,
  );

  return res.status(200).json({
    message: 'If an account exists for this email, a password reset link has been sent.',
    token: result.token,       // undefined in production
    emailSent: result.emailSent,
  });
});

/**
 * POST /sellers/confirm-password-reset
 * Validates the reset token and updates the seller's password.
 * Responds with 400 if the token is missing, invalid, or expired.
 */
const confirmStoreOwnerPasswordReset = asyncHandler(async (req, res) => {
  const result = await storeOwnerService.confirmPasswordReset(
    req.body.token,
    req.body.newPassword,
  );

  if (!result.ok) {
    throw createHttpError(400, 'Invalid or expired token');
  }

  return res.status(200).json({
    message: 'Password updated successfully',
    email: result.email,
  });
});

// ─── Exports ──────────────────────────────────────────────────────────────────

module.exports = {
  createStoreOwner,
  loginStoreOwner,
  refreshStoreOwnerToken,
  requestStoreOwnerEmailVerification,
  confirmStoreOwnerEmailVerification,
  requestStoreOwnerPasswordReset,
  confirmStoreOwnerPasswordReset,
};
