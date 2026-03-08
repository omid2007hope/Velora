const model = require("../../model/Address");
const BaseService = require("../BaseService");

module.exports = new (class CustomerAddress extends BaseService {
  async CustomerAddress({ userId, country, city, street, postalCode }) {
    const customerAddressNormalization = {
      userId,
      country: String(country).toLowerCase().trim(),
      city: String(city).toLowerCase().trim(),
      street: String(street).toLowerCase().trim(),
      postalCode: String(postalCode).toLowerCase().trim(),
    };

    const searchTheDataBase = await this.model
      .findOne({
        userId: customerAddressNormalization.userId,
        country: customerAddressNormalization.country,
        city: customerAddressNormalization.city,
        street: customerAddressNormalization.street,
        postalCode: customerAddressNormalization.postalCode,
      })
      .lean();

    if (searchTheDataBase) {
      return {
        source: "database",
        existed: true,
        data: {
          _id: searchTheDataBase._id,
          userId: searchTheDataBase.userId,
          country: searchTheDataBase.country,
          city: searchTheDataBase.city,
          street: searchTheDataBase.street,
          postalCode: searchTheDataBase.postalCode,
        },
      };
    }

    const saveCustomerAddress = await this.createObject(
      customerAddressNormalization,
    );

    return {
      source: "created",
      existed: false,
      data: {
        _id: saveCustomerAddress._id,
        userId: saveCustomerAddress.userId,
        country: saveCustomerAddress.country,
        city: saveCustomerAddress.city,
        street: saveCustomerAddress.street,
        postalCode: saveCustomerAddress.postalCode,
      },
    };
  }
})(model);


