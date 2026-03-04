// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Payment");
const BaseService = require("../BaseService");
const crypto = require("crypto");

function hashSensitiveValue(value) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(value), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function createCardFingerprint(cardNumber) {
  return crypto
    .createHash("sha256")
    .update(String(cardNumber))
    .digest("hex");
}

module.exports = new (class PaymentService extends BaseService {
  async PaymentDetails({ name, cardNumber, cvv, expiry }) {
    console.log("Service: processing payment request");

    const normalizedCardNumber = String(cardNumber).replace(/\D/g, "");

    const customerPaymentDetailsNormalization = {
      expiry: String(expiry).trim(),
      name: String(name).trim(),
      cardNumber: hashSensitiveValue(normalizedCardNumber),
      cvv: hashSensitiveValue(cvv),
      cardFingerprint: createCardFingerprint(normalizedCardNumber),
      cardLast4: normalizedCardNumber.slice(-4),
    };

    const searchTheDataBase = await this.model
      .findOne({
        cardFingerprint: customerPaymentDetailsNormalization.cardFingerprint,
      })
      .lean();

    if (searchTheDataBase) {
      return {
        source: "database",
        existed: true,
        data: {
          _id: searchTheDataBase._id,
          expiry: searchTheDataBase.expiry,
          name: searchTheDataBase.name,
          cardLast4: searchTheDataBase.cardLast4,
        },
      };
    }

    const saveCustomerPaymentDetails = await this.createObject(
      customerPaymentDetailsNormalization,
    );

    return {
      source: "created",
      existed: false,
      data: {
        _id: saveCustomerPaymentDetails._id,
        expiry: saveCustomerPaymentDetails.expiry,
        name: saveCustomerPaymentDetails.name,
        cardLast4: saveCustomerPaymentDetails.cardLast4,
      },
    };
  }
})(model);


