// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Register");
const BaseService = require("../BaseService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = new (class Login extends BaseService {
  async loginService({ email, password }) {
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

    const accessToken = jwt.sign(
      {
        sub: customer._id.toString(),
        email: customer.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      {
        sub: customer._id.toString(),
        email: customer.email,
      },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      authenticated: true,
      data: {
        _id: customer._id,
        email: customer.email,
        fullName: customer.fullName,
        isEmailVerified: !!customer.isEmailVerified,
      },
      token: accessToken,
      refreshToken,
    };
  }
})(model);


