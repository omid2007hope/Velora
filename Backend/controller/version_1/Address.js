const CustomerAddressService = require("../../service/version_1/Address");

async function CustomerAddress(req, res) {
  try {
    const { country, city, street, postalCode } = req.body || {};

    const normalizedInput = {
      country: typeof country === "string" ? country.trim() : "",
      city: typeof city === "string" ? city.trim() : "",
      street: typeof street === "string" ? street.trim() : "",
      postalCode: typeof postalCode === "string" ? postalCode.trim() : "",
    };

    if (
      !normalizedInput.country ||
      !normalizedInput.city ||
      !normalizedInput.street ||
      !normalizedInput.postalCode
    ) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["country", "city", "street", "postalCode"],
      });
    }

    const sendCustomerAddress = await CustomerAddressService.CustomerAddress(
      normalizedInput,
    );

    if (sendCustomerAddress?.existed) {
      return res.status(409).json({
        error: "Address already exists",
        data: sendCustomerAddress.data,
      });
    }

    console.log("Controller: address create request received");

    return res.status(201).json(sendCustomerAddress);
  } catch (error) {
    console.error("CustomerAddress error:", error.message);

    if (error?.code === 11000) {
      return res.status(409).json({
        error: "Address already exists",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  CustomerAddress,
};
