// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const PaymentService = require("../../service/version_1/Payment");

async function PaymentDetails(req, res) {
  try {
    const { paymentMethodId, billingName } = req.body || {};
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const saved = await PaymentService.savePaymentMethod({
      userId,
      paymentMethodId,
      billingName,
    });

    const statusCode = saved.existed ? 200 : 201;

    return res.status(statusCode).json({
      _id: saved?.data?._id,
      ...saved,
    });
  } catch (error) {
    console.error("PaymentDetails error:", error.message);

    return res.status(error.status || 500).json({
      error: error.status ? error.message : "Internal server error",
    });
  }
}

module.exports = {
  PaymentDetails,
};


