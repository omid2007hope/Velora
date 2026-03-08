const jwt = require("jsonwebtoken");
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

    const sendLoginData = await loginService.loginService(
      loginDataNormalization,
    );

    if (!sendLoginData?.authenticated) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      token: sendLoginData.token,
      refreshToken: sendLoginData.refreshToken,
      data: sendLoginData.data,
    });
  } catch (error) {
    console.error("loginIntoTheAccount error:", error.message);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function refreshAccessToken(req, res) {
  try {
    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      return res.status(400).json({ error: "refreshToken is required" });
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    );

    const newAccessToken = jwt.sign(
      {
        sub: payload.sub,
        email: payload.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    return res.status(200).json({
      token: newAccessToken,
    });
  } catch (error) {
    console.error("refreshAccessToken error:", error.message);
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}

module.exports = {
  loginIntoTheAccount,
  refreshAccessToken,
};


