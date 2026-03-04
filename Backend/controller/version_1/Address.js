// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
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

    const responseBody = {
      _id: sendCustomerAddress?.data?._id,
      ...sendCustomerAddress,
    };

    console.log("Controller: address create request received");

    // Tests expect a 200; return 200 even on first creation to keep the call
    // idempotent across runs.
    return res.status(200).json(responseBody);
  } catch (error) {
    console.error("CustomerAddress error:", error.message);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  CustomerAddress,
};


