const customerDetailsService = require("../../service/version_1/Account");

async function CustomerDetails(req, res) {
  try {
    const { phoneNumber, dateOfBirth, gender } = req.body || {};
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

    if (sendCustomerDetails?.existed) {
      return res.status(409).json({
        error: "Customer details already exist for this phone number",
        data: sendCustomerDetails.data,
      });
    }

    console.log("Controller: customer registration request received");

    return res.status(201).json(sendCustomerDetails);
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
