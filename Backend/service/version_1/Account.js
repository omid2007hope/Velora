const model = require("../../model/Account");
const BaseService = require("../BaseService");

module.exports = new (class CustomerDetails extends BaseService {
  async customerDetails({ userId, phoneNumber, dateOfBirth, gender }) {
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
          { returnDocument: "after", runValidators: true },
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
  async customerRegister(payload) {
    return this.customerDetails(payload);
  }
})(model);


