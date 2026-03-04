const model = require("../../model/Register");
const BaseService = require("../BaseService");
const crypto = require("crypto");

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

    return {
      authenticated: true,
      data: {
        _id: customer._id,
        email: customer.email,
        fullName: customer.fullName,
      },
    };
  }
})(model);
