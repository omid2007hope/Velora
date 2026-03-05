// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const recoveryService = require("../../service/version_1/Recovery");

async function requestVerification(req, res) {
  try {
    const { email } = req.body || {};
    const result = await recoveryService.requestEmailVerification(email);

    if (result.status === "already-verified") {
      return res.status(200).json({
        message: "Email is already verified.",
      });
    }

    return res.status(200).json({
      message:
        "If an account exists for this email, a verification link has been sent.",
      token: result.token,
    });
  } catch (error) {
    console.error("requestVerification error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function confirmVerification(req, res) {
  try {
    const { token } = req.body || {};
    const result = await recoveryService.confirmEmailVerification(token);

    if (!result.ok) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    return res.status(200).json({
      message: "Email verified successfully",
      email: result.email,
    });
  } catch (error) {
    console.error("confirmVerification error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  requestVerification,
  confirmVerification,
};

