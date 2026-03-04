const customerDetailsService = require("../../service/version_1/Account");

async function CustomerDetails(req, res) {
  try {
    const { phoneNumber, dateOfBirth, gender } = req.body || {};

    console.log(phoneNumber, dateOfBirth, gender);

    const normalizedPhone =
      typeof phoneNumber === "string" ? phoneNumber.trim() : "";
    const normalizedDateOfBirth =
      typeof dateOfBirth === "string" ? dateOfBirth.trim() : "";
    const normalizedGender = typeof gender === "string" ? gender.trim() : "";

    if (!normalizedPhone || !normalizedDateOfBirth || !normalizedGender) {
      return res.status(400).json({
        error: "phoneNumber, dateOfBirth, and gender are required",
      });
    }

    const customerDetailsNormalization = {
      phoneNumber: normalizedPhone,
      dateOfBirth: normalizedDateOfBirth,
      gender: normalizedGender,
    };

    const sendCustomerDetails = await customerDetailsService.customerDetails(
      customerDetailsNormalization,
    );

    const responseBody = {
      _id: sendCustomerDetails?.data?._id,
      ...sendCustomerDetails,
    };

    if (sendCustomerDetails?.existed) {
      return res.status(200).json(responseBody);
    }

    console.log("Controller: customer details request received");

    return res.status(201).json(responseBody);
  } catch (error) {
    console.error("CustomerDetails error:", error.message);

    if (error?.code === 11000) {
      return res.status(409).json({
        error: "Customer details already exist for this phone number",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  CustomerDetails,
};
