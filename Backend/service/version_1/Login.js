// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Register");
const BaseService = require("../BaseService");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = (storedPassword || "").split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const incomingHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(
    Buffer.from(incomingHash, "hex"),
    Buffer.from(storedHash, "hex"),
  );
}

module.exports = new (class Login extends BaseService {
  async loginService({ email, password }) {
    const customer = await this.model
      .findOne({ email: email.trim().toLowerCase() })
      .select("+password")
      .lean();

    if (!customer) {
      return { authenticated: false };
    }

    const isPasswordValid = verifyPassword(password, customer.password);

    if (!isPasswordValid) {
      return { authenticated: false };
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }

    const token = jwt.sign(
      {
        sub: customer._id.toString(),
        email: customer.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      authenticated: true,
      data: {
        _id: customer._id,
        email: customer.email,
        fullName: customer.fullName,
      },
      token,
    };
  }
})(model);


