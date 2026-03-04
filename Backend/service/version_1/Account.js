const model = require("../../model/Account");
const BaseService = require("../BaseService");

module.exports = new (class CustomerDetails extends BaseService {
  async customerDetails({ phoneNumber, dateOfBirth, gender }) {
    console.log("Service: processing customer registration");

    const customerDetailsNormalization = {
      phoneNumber: phoneNumber.trim(),
      dateOfBirth: dateOfBirth.trim(),
      gender: gender.trim(),
    };

    const searchTheDataBase = await this.model
      .findOne({ phoneNumber: customerDetailsNormalization.phoneNumber })
      .lean();

    if (searchTheDataBase) {
      return {
        source: "database",
        existed: true,
        data: {
          phoneNumber: searchTheDataBase.phoneNumber,
          dateOfBirth: searchTheDataBase.dateOfBirth,
          gender: searchTheDataBase.gender,
        },
      };
    }

    const saveCustomerData = await this.createObject(
      customerDetailsNormalization,
    );

    return {
      source: "created",
      existed: false,
      data: {
        phoneNumber: saveCustomerData.phoneNumber,
        dateOfBirth: saveCustomerData.dateOfBirth,
        gender: saveCustomerData.gender,
      },
    };
  }

  // Backward-compatible alias for older controller calls.
  async customerRegister(payload) {
    return this.customerDetails(payload);
  }
})(model);
