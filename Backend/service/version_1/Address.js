const model = require("../../model/Address");
const BaseService = require("../BaseService");

module.exports = new (class CustomerAddress extends BaseService {
  async CustomerAddress({ country, city, street, postalCode }) {
    console.log("Service: processing address request");

    const customerAddressNormalization = {
      country: String(country).toLowerCase().trim(),
      city: String(city).toLowerCase().trim(),
      street: String(street).toLowerCase().trim(),
      postalCode: String(postalCode).toLowerCase().trim(),
    };

    const searchTheDataBase = await this.model
      .findOne({
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
        country: saveCustomerAddress.country,
        city: saveCustomerAddress.city,
        street: saveCustomerAddress.street,
        postalCode: saveCustomerAddress.postalCode,
      },
    };
  }
})(model);
