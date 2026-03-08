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

    const responseBody = {
      _id: sendCustomerData?.data?._id,
      ...sendCustomerData,
    };

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


