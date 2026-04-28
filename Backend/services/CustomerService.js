const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Customer = require("../model/Customer");
const BaseService = require("./BaseService");
const { sendEmail } = require("../utils/mailer");
const { getEnvConfig } = require("../config/env");
const SALT_ROUNDS = 12;
module.exports = new (class CustomerService extends BaseService {
  _generateToken(hoursValid = 24) {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
    return { token, expires };
  }
  _normalizeAuthView(authView) {
    return authView === "seller" ? "seller" : "customer";
  }
  _buildClientLink(pathname, token, authView) {
    const { primaryClientUrl } = getEnvConfig();
    const normalizedAuthView = this._normalizeAuthView(authView);
    return `${primaryClientUrl.replace(/\/$/, "")}${pathname}?token=${token}&authView=${normalizedAuthView}`;
  }
  async registerCustomer({ email, fullName, password, authView }) {
    const normalizedCustomer = {
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      password: await bcrypt.hash(password, SALT_ROUNDS),
    };
    const existingCustomer = await this.model
      .findOne({ email: normalizedCustomer.email })
      .lean();
    if (existingCustomer) {
      return {
        source: "database",
        existed: true,
        data: {
          _id: existingCustomer._id,
          email: existingCustomer.email,
          fullName: existingCustomer.fullName,
          isEmailVerified: !!existingCustomer.isEmailVerified,
        },
      };
    }
    const savedCustomer = await this.createObject(normalizedCustomer);
    let emailVerificationToken;
    try {
      const { token, expires } = this._generateToken(24);
      await this.update(
        { _id: savedCustomer._id },
        { emailVerificationToken: token, emailVerificationExpires: expires },
      );
      const verificationLink = this._buildClientLink(
        "/verify-email",
        token,
        authView,
      );
      await sendEmail({
        to: savedCustomer.email,
        subject: "Verify your Velora account",
        text: `Welcome to Velora! Confirm your email by visiting: ${verificationLink}`,
        html: `<p>Welcome to Velora!</p><p>Please confirm your email by clicking the link below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
      });
      emailVerificationToken =
        process.env.NODE_ENV === "production" ? undefined : token;
    } catch (_error) {
      emailVerificationToken = undefined;
    }
    return {
      source: "created",
      existed: false,
      data: {
        _id: savedCustomer._id,
        email: savedCustomer.email,
        fullName: savedCustomer.fullName,
        isEmailVerified: !!savedCustomer.isEmailVerified,
      },
      emailSent: !!emailVerificationToken,
      emailVerificationToken,
    };
  }
  async loginCustomer({ email, password }) {
    const customer = await this.model
      .findOne({ email: email.trim().toLowerCase() })
      .select("+password")
      .lean();
    if (!customer) {
      return { authenticated: false };
    }
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return { authenticated: false };
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }
    const tokenPayload = {
      sub: customer._id.toString(),
      email: customer.email,
      tokenType: "access",
    };
    return {
      authenticated: true,
      data: {
        _id: customer._id,
        email: customer.email,
        fullName: customer.fullName,
        isEmailVerified: !!customer.isEmailVerified,
      },
      token: jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "15m",
      }),
      refreshToken: jwt.sign(
        {
          sub: customer._id.toString(),
          email: customer.email,
          tokenType: "refresh",
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      ),
    };
  }
  async refreshAccessToken(refreshToken) {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT_REFRESH_SECRET is not set");
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (payload.tokenType !== "refresh") {
      throw new Error("Invalid token type");
    }

    return jwt.sign(
      { sub: payload.sub, email: payload.email, tokenType: "access" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
  }
  async requestEmailVerification(email, authView) {
    const customer = await this.model.findOne({
      email: email.trim().toLowerCase(),
    });
    if (!customer) {
      return { ok: true, status: "noop" };
    }
    if (customer.isEmailVerified) {
      return { ok: true, status: "already-verified" };
    }
    const { token, expires } = this._generateToken(24);
    await this.update(
      { _id: customer._id },
      { emailVerificationToken: token, emailVerificationExpires: expires },
    );
    const verificationLink = this._buildClientLink(
      "/verify-email",
      token,
      authView,
    );
    await sendEmail({
      to: customer.email,
      subject: "Verify your Velora account",
      text: `Confirm your Velora account by visiting: ${verificationLink}`,
      html: `<p>Confirm your Velora account by clicking below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
    });
    return {
      ok: true,
      status: "sent",
      email: customer.email,
      token: process.env.NODE_ENV === "production" ? undefined : token,
    };
  }
  async confirmEmailVerification(token) {
    if (!token) {
      return { ok: false, reason: "missing-token" };
    }
    const customer = await this.model.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });
    if (!customer) {
      return { ok: false, reason: "invalid-or-expired" };
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
  async requestPasswordReset(email, authView) {
    const customer = await this.model.findOne({
      email: email.trim().toLowerCase(),
    });
    if (!customer) {
      return { ok: true, status: "noop" };
    }

    const { token, expires } = this._generateToken(1);
    await this.update(
      { _id: customer._id },
      {
        passwordResetToken: token,
        passwordResetExpires: expires,
      },
    );
    const resetLink = this._buildClientLink("/reset-password", token, authView);
    await sendEmail({
      to: customer.email,
      subject: "Reset your Velora password",
      text: `Someone requested a password reset. Open: ${resetLink} (expires in 1 hour). If you did not request this, ignore the email.`,
      html: `<p>We received a request to reset your Velora password.</p><p>Click the button below within 1 hour to choose a new password:</p><p><a href="${resetLink}">Reset password</a></p><p>If you didn't request this, you can ignore this email.</p>`,
    });
    return {
      ok: true,
      status: "sent",
      token: process.env.NODE_ENV === "production" ? undefined : token,
    };
  }
  async confirmPasswordReset(token, newPassword) {
    if (!token) {
      return { ok: false, reason: "missing-token" };
    }

    const customer = await this.model
      .findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() },
      });

    if (!customer || !newPassword) {
      return { ok: false, reason: "invalid-or-expired" };
    }

    const password = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await this.update(
      { _id: customer._id },
      {
        password,
        pendingPasswordHash: null,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    );
    return { ok: true, email: customer.email };
  }
})(Customer);
