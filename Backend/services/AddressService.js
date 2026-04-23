const Address = require("../model/Address");
const BaseService = require("./BaseService");

module.exports = new (class AddressService extends BaseService {
  async createAddress({ userId, country, city, street, postalCode }) {
    const normalizedAddress = {
      userId,
      country: String(country).toLowerCase().trim(),
      city: String(city).toLowerCase().trim(),
      street: String(street).toLowerCase().trim(),
      postalCode: String(postalCode).toLowerCase().trim(),
    };

    const existingAddress = await this.model.findOne(normalizedAddress).lean();

    if (existingAddress) {
      return {
        source: "database",
        existed: true,
        data: {
          _id: existingAddress._id,
          userId: existingAddress.userId,
          country: existingAddress.country,
          city: existingAddress.city,
          street: existingAddress.street,
          postalCode: existingAddress.postalCode,
        },
      };
    }

    const savedAddress = await this.createObject(normalizedAddress);

    return {
      source: "created",
      existed: false,
      data: {
        _id: savedAddress._id,
        userId: savedAddress.userId,
        country: savedAddress.country,
        city: savedAddress.city,
        street: savedAddress.street,
        postalCode: savedAddress.postalCode,
      },
    };
  }
})(Address);
