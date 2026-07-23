const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Customer = require('../model/Customer');
const BaseService = require('./BaseService');
const { sendEmail } = require('../utils/mailer');
const { getEnvConfig } = require('../config/env');
const { createHttpError } = require('../utils/httpError');
const logger = require('../utils/logger');

const SALT_ROUNDS = 12;

module.exports = new (class CustomerService extends BaseService {
  // ─── Private Helpers ────────────────────────────────────────────────────────

  /** Generates a secure random hex token and its expiry date. */
  _generateToken(hoursValid = 24) {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
    return { token, expires };
  }

  /** Builds a frontend deep-link for email actions (verify, reset). */
  _buildClientLink(pathname, token, authView = 'customer') {
    const { primaryClientUrl } = getEnvConfig();
    const view = authView === 'seller' ? 'seller' : 'customer';
    return `${primaryClientUrl.replace(/\/$/, '')}${pathname}?token=${token}&authView=${view}`;
  }

  /** Maps a raw Mongoose Customer document to a safe public shape. */
  _mapCustomer(customer) {
    return {
      _id: customer._id,
      fullName: customer.fullName,
      email: customer.email,
      isEmailVerified: !!customer.isEmailVerified,
    };
  }

  // ─── Auth ────────────────────────────────────────────────────────────────────

  /**
   * Registers a new customer.
   * - If the email already exists, returns the existing record (idempotent).
   * - On success, sends a verification email (non-blocking).
   */
  async registerCustomer({ fullName, email, password, authView }) {
    const normalizedEmail = email.trim().toLowerCase();

    // Check for existing account before hashing — avoids wasted bcrypt work.
    const existingCustomer = await this.model
      .findOne({ email: normalizedEmail })
      .lean();

    if (existingCustomer) {
      return {
        source: 'database',
        existed: true,
        data: this._mapCustomer(existingCustomer),
      };
    }

    const savedCustomer = await this.createObject({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, SALT_ROUNDS),
    });

    // Send verification email. Failure is non-fatal — account is still created.
    let emailVerificationToken;
    try {
      const { token, expires } = this._generateToken(24);

      await this.update(
        { _id: savedCustomer._id },
        { emailVerificationToken: token, emailVerificationExpires: expires },
      );

      const verificationLink = this._buildClientLink('/verify-email', token, authView);

      await sendEmail({
        to: savedCustomer.email,
        subject: 'Verify your Velora account',
        text: `Welcome to Velora! Confirm your email by visiting: ${verificationLink}`,
        html: `<p>Welcome to Velora!</p><p>Please confirm your email by clicking the link below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
      });

      // Only expose the raw token in non-production (for testing/dev).
      emailVerificationToken = process.env.NODE_ENV === 'production' ? undefined : token;
    } catch (_error) {
      emailVerificationToken = undefined;
    }

    return {
      source: 'created',
      existed: false,
      data: this._mapCustomer(savedCustomer),
      emailSent: !!emailVerificationToken,
      emailVerificationToken,
    };
  }

  /**
   * Authenticates a customer by email and password.
   * Returns { authenticated: false } for any credential mismatch
   * to avoid leaking whether the email exists.
   */
  async loginCustomer({ email, password }) {
    const customer = await this.model
      .findOne({ email: email.trim().toLowerCase() })
      .select('+password')
      .lean();

    if (!customer || !customer.password) {
      return { authenticated: false };
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return { authenticated: false };
    }

    if (!process.env.JWT_SECRET) {
      throw createHttpError(500, 'JWT_SECRET is not set');
    }

    const base = { sub: customer._id.toString(), email: customer.email };

    return {
      authenticated: true,
      data: this._mapCustomer(customer),
      token: jwt.sign(
        { ...base, tokenType: 'access' },
        process.env.JWT_SECRET,
        { expiresIn: '15m' },
      ),
      refreshToken: jwt.sign(
        { ...base, tokenType: 'refresh' },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' },
      ),
    };
  }

  /**
   * Verifies a refresh token and issues a new short-lived access token.
   * Throws 401 on any token problem (expired, wrong type, tampered).
   */
  async refreshAccessToken(refreshToken) {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw createHttpError(500, 'JWT_REFRESH_SECRET is not set');
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (payload.tokenType !== 'refresh') {
      throw createHttpError(401, 'Invalid token type');
    }

    return jwt.sign(
      { sub: payload.sub, email: payload.email, tokenType: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );
  }

  // ─── Email Verification ──────────────────────────────────────────────────────

  /**
   * Sends (or re-sends) an email verification link.
   * Returns { status: 'noop' } if email not found — avoids user enumeration.
   * Returns { status: 'already-verified' } if already confirmed.
   */
  async requestEmailVerification(email, authView) {
    const customer = await this.model.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!customer) {
      return { ok: true, status: 'noop' };
    }

    if (customer.isEmailVerified) {
      return { ok: true, status: 'already-verified' };
    }

    const { token, expires } = this._generateToken(24);

    await this.update(
      { _id: customer._id },
      { emailVerificationToken: token, emailVerificationExpires: expires },
    );

    const verificationLink = this._buildClientLink('/verify-email', token, authView);

    let emailSent = false;
    try {
      await sendEmail({
        to: customer.email,
        subject: 'Verify your Velora account',
        text: `Confirm your Velora account by visiting: ${verificationLink}`,
        html: `<p>Confirm your Velora account by clicking below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
      });
      emailSent = true;
    } catch (_error) {
      logger.error('Customer verification email failed to send', _error);
    }

    return {
      ok: true,
      status: 'sent',
      emailSent,
      email: customer.email,
      token: process.env.NODE_ENV === 'production' ? undefined : token,
    };
  }

  /** Confirms an email verification token and marks the account as verified. */
  async confirmEmailVerification(token) {
    if (!token) {
      return { ok: false, reason: 'missing-token' };
    }

    const customer = await this.model.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!customer) {
      return { ok: false, reason: 'invalid-or-expired' };
    }

    await this.update(
      { _id: customer._id },
      {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    );

    return { ok: true, email: customer.email };
  }

  // ─── Password Reset ──────────────────────────────────────────────────────────

  /**
   * Initiates a password reset flow.
   * Optionally pre-hashes `newPassword` as a pending hash so the reset
   * link click alone is enough to apply it (no second form submission needed).
   */
  async requestPasswordReset(email, newPassword, authView) {
    const customer = await this.model.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!customer) {
      return { ok: true, status: 'noop' };
    }

    const { token, expires } = this._generateToken(1); // 1-hour window

    const updates = {
      passwordResetToken: token,
      passwordResetExpires: expires,
    };

    if (newPassword) {
      updates.pendingPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    }

    await this.update({ _id: customer._id }, updates);

    const resetLink = this._buildClientLink('/reset-password', token, authView);

    let emailSent = false;
    try {
      await sendEmail({
        to: customer.email,
        subject: 'Reset your Velora password',
        text: `Someone requested a password reset. Open: ${resetLink} (expires in 1 hour). If you did not request this, ignore the email.`,
        html: `<p>We received a request to reset your Velora password.</p><p>Click the button below within 1 hour to choose a new password:</p><p><a href="${resetLink}">Reset password</a></p><p>If you didn't request this, you can ignore this email.</p>`,
      });
      emailSent = true;
    } catch (_error) {
      logger.error('Customer password reset email failed to send', _error);
    }

    return {
      ok: true,
      status: 'sent',
      emailSent,
      token: process.env.NODE_ENV === 'production' ? undefined : token,
    };
  }

  /**
   * Completes the password reset.
   * Priority: if `newPassword` is provided inline it takes precedence over
   * the pre-hashed `pendingPasswordHash` stored during requestPasswordReset.
   */
  async confirmPasswordReset(token, newPassword) {
    if (!token) {
      return { ok: false, reason: 'missing-token' };
    }

    const customer = await this.model
      .findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() },
      })
      .select('+pendingPasswordHash');

    if (!customer) {
      return { ok: false, reason: 'invalid-or-expired' };
    }

    // Inline newPassword takes priority over the pre-stored pending hash.
    const passwordHash = newPassword
      ? await bcrypt.hash(newPassword, SALT_ROUNDS)
      : customer.pendingPasswordHash;

    if (!passwordHash) {
      return { ok: false, reason: 'invalid-or-expired' };
    }

    await this.update(
      { _id: customer._id },
      {
        password: passwordHash,
        pendingPasswordHash: null,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    );

    return { ok: true, email: customer.email };
  }
})(Customer);
