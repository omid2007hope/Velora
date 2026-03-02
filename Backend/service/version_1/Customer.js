const model = require("../../model/Customer");
const BaseService = require("../BaseService");
const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

module.exports = new (class Customer extends BaseService {
  async customerRegister({ email, fullName, password }) {
    console.log("Service: processing customer registration");

    const customerDataNormalization = {
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      password: hashPassword(password),
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
        },
      };
    }

    const saveCustomerData = await this.createObject(customerDataNormalization);

    return {
      source: "created",
      existed: false,
      data: {
        _id: saveCustomerData._id,
        email: saveCustomerData.email,
        fullName: saveCustomerData.fullName,
      },
    };
  }
})(model);
