const { loginService } = require("../../service/version_1/Login");
const CustomerModel = require("../../model/Customer");

async function loginIntoTheAccount(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["email", "password"],
      });
    }

    const loginDataNormalization = {
      email: email.toLowerCase().trim(),
      password: password.trim(),
    };

    const userData = await CustomerModel.find({});

    const simplifiedCustomerData = await Promise.all(
      userData.map(async (user) => {
        return {
          email: user.email,
          password: user.password,
          fullName: user.fullName,
          id: user.id,
        };
      }),
    );

    const sendLoginData = await loginService(loginDataNormalization);

    if (sendLoginData?.existed) {
      return res.status(409).json({
        error: "Customer already exists with this email",
        data: sendLoginData.data,
      });
    }

    console.log("Controller: customer registration request received");

    return res.status(201).json(sendLoginData);
  } catch (error) {
    console.error("CustomerData error:", error.message);

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
  loginIntoTheAccount,
};
