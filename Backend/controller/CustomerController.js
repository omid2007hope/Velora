const asyncHandler = require('../utils/asyncHandler');
const { createHttpError } = require('../utils/httpError');
const customerService = require('../services/CustomerService');

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * POST /customers/register
 * Creates a new customer account.
 * Returns 201 with the created (or already-existing) customer record.
 */
const createCustomer = asyncHandler(async (req, res) => {
  const result = await customerService.registerCustomer(req.body);

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
 * POST /customers/login
 * Authenticates a customer and returns JWT access + refresh tokens.
 * Responds with 401 if credentials are invalid.
 */
const loginCustomer = asyncHandler(async (req, res) => {
  const result = await customerService.loginCustomer(req.body);

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
 * POST /customers/refresh-token
 * Accepts a valid refresh token and returns a new short-lived access token.
 * Responds with 401 if the refresh token is invalid or expired.
 */
const refreshCustomerToken = asyncHandler(async (req, res) => {
  try {
    const token = await customerService.refreshAccessToken(req.body.refreshToken);
    return res.status(200).json({ token });
  } catch (_error) {
    throw createHttpError(401, 'Invalid or expired refresh token');
  }
});

// ─── Email Verification ───────────────────────────────────────────────────────

/**
 * POST /customers/request-email-verification
 * Sends (or re-sends) a verification email to the given address.
 * Always returns 200 to avoid email enumeration attacks.
 */
const requestCustomerEmailVerification = asyncHandler(async (req, res) => {
  const result = await customerService.requestEmailVerification(
    req.body.email,
    req.body.authView,
  );

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
 * POST /customers/confirm-email-verification
 * Validates the verification token and marks the account as verified.
 * Responds with 400 if the token is missing, invalid, or expired.
 */
const confirmCustomerEmailVerification = asyncHandler(async (req, res) => {
  const result = await customerService.confirmEmailVerification(req.body.token);

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
 * POST /customers/request-password-reset
 * Sends a password-reset email to the given address.
 * Always returns 200 to avoid email enumeration attacks.
 */
const requestCustomerPasswordReset = asyncHandler(async (req, res) => {
  const result = await customerService.requestPasswordReset(
    req.body.email,
    req.body.newPassword,
    req.body.authView,
  );

  return res.status(200).json({
    message: 'If an account exists for this email, a password reset link has been sent.',
    token: result.token,       // undefined in production
    emailSent: result.emailSent,
  });
});

/**
 * POST /customers/confirm-password-reset
 * Validates the reset token and updates the customer's password.
 * Responds with 400 if the token is missing, invalid, or expired.
 */
const confirmCustomerPasswordReset = asyncHandler(async (req, res) => {
  const result = await customerService.confirmPasswordReset(
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
  createCustomer,
  loginCustomer,
  refreshCustomerToken,
  requestCustomerEmailVerification,
  confirmCustomerEmailVerification,
  requestCustomerPasswordReset,
  confirmCustomerPasswordReset,
};
