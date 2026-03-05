// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Register");
const BaseService = require("../BaseService");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendEmail } = require("../../utils/mailer");
const SALT_ROUNDS = 12;

module.exports = new (class Customer extends BaseService {
  _generateToken(hoursValid = 24) {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
    return { token, expires };
  }

  async _sendVerificationEmail(customerId, email) {
    const { token, expires } = this._generateToken(24);

    await this.update(
      { _id: customerId },
      {
        emailVerificationToken: token,
        emailVerificationExpires: expires,
      },
    );

    const clientUrl =
      process.env.CLIENT_URL?.split(",")?.[0]?.trim() ||
      "http://localhost:3000";
    const verificationLink = `${clientUrl.replace(/\/$/, "")}/verify-email?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Verify your Velora account",
      text: `Welcome to Velora! Confirm your email by visiting: ${verificationLink}`,
      html: `<p>Welcome to Velora!</p><p>Please confirm your email by clicking the link below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
    });

    return token;
  }

  async customerRegister({ email, fullName, password }) {
    console.log("Service: processing customer registration");

    const customerDataNormalization = {
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      password: await bcrypt.hash(password, SALT_ROUNDS),
    };

    const searchTheDataBase = await this.model
      .findOne({ email: customerDataNormalization.email })
      .lean();

    if (searchTheDataBase) {
      return {
        source: "database",
        existed: true,
        data: {
          _id: searchTheDataBase._id,
          email: searchTheDataBase.email,
          fullName: searchTheDataBase.fullName,
          isEmailVerified: !!searchTheDataBase.isEmailVerified,
        },
      };
    }

    const saveCustomerData = await this.createObject(customerDataNormalization);

    let token;
    try {
      token = await this._sendVerificationEmail(
        saveCustomerData._id,
        saveCustomerData.email,
      );
    } catch (err) {
      console.error("Failed to send verification email:", err.message);
    }

    return {
      source: "created",
      existed: false,
      data: {
        _id: saveCustomerData._id,
        email: saveCustomerData.email,
        fullName: saveCustomerData.fullName,
        isEmailVerified: !!saveCustomerData.isEmailVerified,
      },
      // Expose the token in non-production environments to make automated
      // tests and local QA easier. Do not rely on this in production.
      emailVerificationToken:
        process.env.NODE_ENV === "production" ? undefined : token,
    };
  }
})(model);


