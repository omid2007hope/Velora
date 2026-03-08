const CustomerAddressService = require("../../service/version_1/Address");

async function CustomerAddress(req, res) {
  try {
    const { country, city, street, postalCode } = req.body || {};
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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

    const sendCustomerAddress = await CustomerAddressService.CustomerAddress({
      userId,
      ...normalizedInput,
    });

    const responseBody = {
      _id: sendCustomerAddress?.data?._id,
      ...sendCustomerAddress,
    };

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


