// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const recoveryService = require("../../service/version_1/Recovery");

async function requestPasswordReset(req, res) {
  try {
    const { email, newPassword } = req.body || {};
    const result = await recoveryService.requestPasswordReset(
      email,
      newPassword,
    );

    return res.status(200).json({
      message:
        "If an account exists for this email, a password reset link has been sent.",
      token: result.token,
    });
  } catch (error) {
    console.error("requestPasswordReset error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function confirmPasswordReset(req, res) {
  try {
    const { token } = req.body || {};
    const result = await recoveryService.confirmPasswordReset(token);

    if (!result.ok) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    return res.status(200).json({
      message: "Password updated successfully",
      email: result.email,
    });
  } catch (error) {
    console.error("confirmPasswordReset error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  requestPasswordReset,
  confirmPasswordReset,
};

