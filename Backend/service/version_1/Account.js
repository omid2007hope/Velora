// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const model = require("../../model/Account");
const BaseService = require("../BaseService");

module.exports = new (class CustomerDetails extends BaseService {
  async customerDetails({ userId, phoneNumber, dateOfBirth, gender }) {
    console.log("Service: processing customer details");

    const customerDetailsNormalization = {
      userId,
      phoneNumber: phoneNumber.trim(),
      dateOfBirth: dateOfBirth.trim(),
      gender: gender.trim(),
    };

    const existingCustomerDetails = await this.model
      .findOne({
        userId: customerDetailsNormalization.userId,
      })
      .lean();

    if (existingCustomerDetails) {
      const updatedCustomerDetails = await this.model
        .findOneAndUpdate(
          { userId: customerDetailsNormalization.userId },
          {
            phoneNumber: customerDetailsNormalization.phoneNumber,
            dateOfBirth: customerDetailsNormalization.dateOfBirth,
            gender: customerDetailsNormalization.gender,
          },
          { new: true, runValidators: true },
        )
        .lean();

      return {
        source: "updated",
        existed: true,
        data: {
          _id: updatedCustomerDetails._id,
          userId: updatedCustomerDetails.userId,
          phoneNumber: updatedCustomerDetails.phoneNumber,
          dateOfBirth: updatedCustomerDetails.dateOfBirth,
          gender: updatedCustomerDetails.gender,
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
        _id: saveCustomerData._id,
        userId: saveCustomerData.userId,
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


