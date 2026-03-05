// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const BaseService = require("../BaseService");
const model = require("../../model/Register");
const { sendEmail } = require("../../utils/mailer");

const SALT_ROUNDS = 12;

function generateToken(hoursValid) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
  return { token, expires };
}

module.exports = new (class Recovery extends BaseService {
  async requestEmailVerification(email) {
    const customer = await this.model.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!customer) {
      return { ok: true, status: "noop" };
    }

    if (customer.isEmailVerified) {
      return { ok: true, status: "already-verified" };
    }

    const { token, expires } = generateToken(24);

    await this.update(
      { _id: customer._id },
      {
        emailVerificationToken: token,
        emailVerificationExpires: expires,
      },
    );

    const clientUrl =
      process.env.CLIENT_URL?.split(",")?.[0]?.trim() ||
      "http://localhost:3000";
    const link = `${clientUrl.replace(/\/$/, "")}/verify-email?token=${token}`;

    await sendEmail({
      to: customer.email,
      subject: "Verify your Velora account",
      text: `Confirm your Velora account by visiting: ${link}`,
      html: `<p>Confirm your Velora account by clicking below:</p><p><a href="${link}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
    });

    return {
      ok: true,
      status: "sent",
      email: customer.email,
      token: process.env.NODE_ENV === "production" ? undefined : token,
    };
  }

  async confirmEmailVerification(token) {
    if (!token) return { ok: false, reason: "missing-token" };

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

  async requestPasswordReset(email, newPassword) {
    const customer = await this.model.findOne({
      email: email.trim().toLowerCase(),
    });

    // Always respond with success to avoid user enumeration.
    if (!customer) {
      return { ok: true, status: "noop" };
    }

    const hashedPendingPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const { token, expires } = generateToken(1); // 1 hour validity

    await this.update(
      { _id: customer._id },
      {
        passwordResetToken: token,
        passwordResetExpires: expires,
        pendingPasswordHash: hashedPendingPassword,
      },
    );

    const clientUrl =
      process.env.CLIENT_URL?.split(",")?.[0]?.trim() ||
      "http://localhost:3000";
    const link = `${clientUrl.replace(/\/$/, "")}/reset-password?token=${token}`;

    await sendEmail({
      to: customer.email,
      subject: "Reset your Velora password",
      text: `Someone requested a password reset. To apply the new password, open: ${link} (expires in 1 hour). If you did not request this, ignore the email.`,
      html: `<p>We received a request to reset your Velora password.</p><p>To apply the new password you chose, click the button below within 1 hour:</p><p><a href="${link}">Reset password</a></p><p>If you didn't request this, you can ignore this email.</p>`,
    });

    return {
      ok: true,
      status: "sent",
      token: process.env.NODE_ENV === "production" ? undefined : token,
    };
  }

  async confirmPasswordReset(token) {
    if (!token) return { ok: false, reason: "missing-token" };

    const customer = await this.model.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    }).select("+pendingPasswordHash");

    if (!customer || !customer.pendingPasswordHash) {
      return { ok: false, reason: "invalid-or-expired" };
    }

    await this.update(
      { _id: customer._id },
      {
        password: customer.pendingPasswordHash,
        pendingPasswordHash: null,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    );

    return { ok: true, email: customer.email };
  }
})(model);

