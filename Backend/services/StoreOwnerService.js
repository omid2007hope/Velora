const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const StoreOwner = require('../model/storeOwner');
const BaseService = require('./BaseService');
const { sendEmail } = require('../utils/mailer');
const { getEnvConfig } = require('../config/env');
const { createHttpError } = require('../utils/httpError');
const logger = require('../utils/logger');

const SALT_ROUNDS = 12;

module.exports = new (class StoreOwnerService extends BaseService {
  _generateToken(hoursValid = 24) {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
    return { token, expires };
  }

  _buildClientLink(pathname, token) {
    const { primaryClientUrl } = getEnvConfig();
    return `${primaryClientUrl.replace(/\/$/, '')}${pathname}?token=${token}&authView=seller`;
  }

  _mapStoreOwner(storeOwner) {
    return {
      _id: storeOwner._id,
      fullName: storeOwner.fullName,
      email: storeOwner.email,
      isEmailVerified: !!storeOwner.isEmailVerified,
    };
  }

  async registerStoreOwner({ fullName, email, password }) {
    const normalizedStoreOwner = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: await bcrypt.hash(password, SALT_ROUNDS),
    };

    const existingStoreOwner = await this.model
      .findOne({ email: normalizedStoreOwner.email })
      .lean();

    if (existingStoreOwner) {
      return {
        source: 'database',
        existed: true,
        data: this._mapStoreOwner(existingStoreOwner),
      };
    }

    const savedStoreOwner = await this.createObject(normalizedStoreOwner);
    let emailVerificationToken;

    try {
      const { token, expires } = this._generateToken(24);

      await this.update(
        { _id: savedStoreOwner._id },
        {
          emailVerificationToken: token,
          emailVerificationExpires: expires,
        },
      );

      const verificationLink = this._buildClientLink('/verify-email', token);

      await sendEmail({
        to: savedStoreOwner.email,
        subject: 'Verify your Velora seller account',
        text: `Welcome to Velora! Confirm your seller email by visiting: ${verificationLink}`,
        html: `<p>Welcome to Velora!</p><p>Please confirm your seller email by clicking the link below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
      });

      emailVerificationToken =
        process.env.NODE_ENV === 'production' ? undefined : token;
    } catch (_error) {
      emailVerificationToken = undefined;
    }

    return {
      source: 'created',
      existed: false,
      data: this._mapStoreOwner(savedStoreOwner),
      emailSent: !!emailVerificationToken,
      emailVerificationToken,
    };
  }

  async loginStoreOwner({ email, password }) {
    const storeOwner = await this.model
      .findOne({
        email: email.trim().toLowerCase(),
      })
      .select('+password')
      .lean();

    if (!storeOwner || !storeOwner.password) {
      return { authenticated: false };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      storeOwner.password,
    );

    if (!isPasswordValid) {
      return { authenticated: false };
    }

    if (!process.env.JWT_SECRET) {
      throw createHttpError(500, 'JWT_SECRET is not set');
    }

    const tokenPayload = {
      sub: storeOwner._id.toString(),
      email: storeOwner.email,
      role: 'seller',
      tokenType: 'access',
    };

    return {
      authenticated: true,
      data: this._mapStoreOwner(storeOwner),
      token: jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: '15m',
      }),
      refreshToken: jwt.sign(
        {
          sub: storeOwner._id.toString(),
          email: storeOwner.email,
          role: 'seller',
          tokenType: 'refresh',
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' },
      ),
    };
  }

  async refreshAccessToken(refreshToken) {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw createHttpError(500, 'JWT_REFRESH_SECRET is not set');
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (payload.tokenType !== 'refresh') {
      throw createHttpError(500, 'Invalid token type');
    }

    return jwt.sign(
      {
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
        tokenType: 'access',
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );
  }

  async requestEmailVerification(email) {
    const storeOwner = await this.model.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!storeOwner) {
      return { ok: true, status: 'noop' };
    }

    if (storeOwner.isEmailVerified) {
      return { ok: true, status: 'already-verified' };
    }

    const { token, expires } = this._generateToken(24);

    await this.update(
      { _id: storeOwner._id },
      {
        emailVerificationToken: token,
        emailVerificationExpires: expires,
      },
    );

    const verificationLink = this._buildClientLink('/verify-email', token);

    let emailSent = false;
    try {
      await sendEmail({
        to: storeOwner.email,
        subject: 'Verify your Velora seller account',
        text: `Confirm your Velora seller account by visiting: ${verificationLink}`,
        html: `<p>Confirm your Velora seller account by clicking below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
      });
      emailSent = true;
    } catch (_error) {
      logger.error('Store owner verification email failed to send', _error);
    }

    return {
      ok: true,
      status: 'sent',
      emailSent,
      email: storeOwner.email,
      token: process.env.NODE_ENV === 'production' ? undefined : token,
    };
  }

  async confirmEmailVerification(token) {
    if (!token) {
      return { ok: false, reason: 'missing-token' };
    }

    const storeOwner = await this.model.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!storeOwner) {
      return { ok: false, reason: 'invalid-or-expired' };
    }

    await this.update(
      { _id: storeOwner._id },
      {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    );

    return { ok: true, email: storeOwner.email };
  }

  async requestPasswordReset(email, newPassword) {
    const storeOwner = await this.model.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!storeOwner) {
      return { ok: true, status: 'noop' };
    }

    const { token, expires } = this._generateToken(1);

    const updates = {
      passwordResetToken: token,
      passwordResetExpires: expires,
    };

    if (newPassword) {
      updates.pendingPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    }

    await this.update({ _id: storeOwner._id }, updates);

    const resetLink = this._buildClientLink('/reset-password', token);

    let emailSent = false;
    try {
      await sendEmail({
        to: storeOwner.email,
        subject: 'Reset your Velora seller password',
        text: `Someone requested a seller password reset. Open: ${resetLink} (expires in 1 hour). If you did not request this, ignore the email.`,
        html: `<p>We received a request to reset your Velora seller password.</p><p>Click the button below within 1 hour to choose a new password:</p><p><a href="${resetLink}">Reset password</a></p><p>If you didn't request this, you can ignore this email.</p>`,
      });
      emailSent = true;
    } catch (_error) {
      logger.error('Store owner password reset email failed to send', _error);
    }

    return {
      ok: true,
      status: 'sent',
      emailSent,
      token: process.env.NODE_ENV === 'production' ? undefined : token,
    };
  }

  async confirmPasswordReset(token, newPassword) {
    if (!token) {
      return { ok: false, reason: 'missing-token' };
    }

    const storeOwner = await this.model
      .findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() },
      })
      .select('+pendingPasswordHash');

    if (!storeOwner) {
      return { ok: false, reason: 'invalid-or-expired' };
    }

    let passwordHash = storeOwner.pendingPasswordHash;

    if (newPassword) {
      passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    }

    if (!passwordHash) {
      return { ok: false, reason: 'invalid-or-expired' };
    }

    await this.update(
      { _id: storeOwner._id },
      {
        password: passwordHash,
        pendingPasswordHash: null,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    );

    return { ok: true, email: storeOwner.email };
  }
})(StoreOwner);
