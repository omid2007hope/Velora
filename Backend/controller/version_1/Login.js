const loginService = require("../../service/version_1/Login");

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

    const sendLoginData = await loginService.loginService(loginDataNormalization);

    if (!sendLoginData?.authenticated) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    console.log("Controller: customer login request received");

    return res.status(200).json({
      message: "Login successful",
      data: sendLoginData.data,
    });
  } catch (error) {
    console.error("loginIntoTheAccount error:", error.message);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  loginIntoTheAccount,
};
