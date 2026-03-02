const customerDetailsService = require("../../service/version_1/CustomerDetails");

async function CustomerDetails(req, res) {
  try {
    const { phoneNumber, dateOfBirth, gender } = req.body || {};

    const customerDetailsNormalization = {
      phoneNumber,
      dateOfBirth,
      gender,
    };

    const sendCustomerDetails = await customerDetailsService.customerRegister(
      customerDetailsNormalization,
    );

    if (sendCustomerDetails?.existed) {
      return res.status(409).json({
        error: "Customer already exists with this email",
        data: sendCustomerDetails.data,
      });
    }

    console.log("Controller: customer registration request received");

    return res.status(201).json(sendCustomerDetails);
  } catch (error) {
    console.error("CustomerDetails error:", error.message);

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
  CustomerDetails,
};
