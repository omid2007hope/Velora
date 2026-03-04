const model = require("../../model/Address");
const BaseService = require("../BaseService");

module.exports = new (class CustomerAddress extends BaseService {
  async CustomerAddress({ country, city, street, postalCode }) {
    console.log("Service: processing customer registration");

    const customerAddressNormalization = {
      country: country.toLowerCase().trim(),
      city: city.toLowerCase().trim(),
      street: street.toLowerCase().trim(),
      postalCode: postalCode.toLowerCase().trim(),
    };

    const searchTheDataBase = await this.model
      .findOne({
        street: customerAddressNormalization.street,
      })
      .lean();

    if (searchTheDataBase) {
      return {
        source: "database",
        existed: true,
        data: {
          country: customerAddressNormalization.country,
          city: customerAddressNormalization.city,
          street: customerAddressNormalization.street,
          postalCode: customerAddressNormalization.postalCode,
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
