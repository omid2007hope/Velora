const CustomerAddressService = require("../../service/version_1/Address");

async function CustomerAddress(req, res) {
  try {
    const { country, city, street, postalCode } = req.body || {};

    if (!country || !city || !street || !postalCode) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["country", "city", "street", "postalCode"],
      });
    }

    const customerAddressNormalization = {
      country,
      city,
      street,
      postalCode,
    };

    const sendCustomerAddress = await CustomerAddressService.CustomerAddress(
      customerAddressNormalization,
    );

    if (sendCustomerAddress?.existed) {
      return res.status(409).json({
        error: "Customer already exists with this email",
        data: sendCustomerAddress.data,
      });
    }

    console.log("Controller: customer registration request received");

    return res.status(201).json(sendCustomerAddress);
  } catch (error) {
    console.error("CustomerAddress error:", error.message);

    if (error?.code === 11000) {
      return res.status(409).json({
        error: "Customer already exists with this email",
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
