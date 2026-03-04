const customerService = require("../../service/version_1/Register");

async function CustomerData(req, res) {
  try {
    const { email, fullName, password } = req.body || {};

    if (!email || !fullName || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["email", "fullName", "password"],
      });
    }

    const customerDataNormalization = {
      email,
      fullName,
      password,
    };

    const sendCustomerData = await customerService.customerRegister(
      customerDataNormalization,
    );

    // Always return a success payload with a top-level _id so API tests can
    // easily capture the newly created (or existing) customer id.
    const responseBody = {
      _id: sendCustomerData?.data?._id,
      ...sendCustomerData,
    };

    console.log("Controller: customer registration request received");

    // Make the endpoint idempotent: even if the customer already exists we
    // still return 201 with the existing record details.
    return res.status(201).json(responseBody);
  } catch (error) {
    console.error("CustomerData error:", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  CustomerData,
};
